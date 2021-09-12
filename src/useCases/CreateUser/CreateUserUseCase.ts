import { User } from "../../entitites/User";
import { IMailProveider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import * as Yup from "yup";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProveider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .test(
          "is valid",
          "${value} already exists",
          async (email) =>
            (await this.usersRepository.findByEmail(email)) === undefined
        ),
      password: Yup.string().required().min(6),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: "Equipe do Meu App",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à platoforma",
      body: "<p>Você já pode fazer login em nossa plataforma.</p>",
    });

    return user;
  }
}
