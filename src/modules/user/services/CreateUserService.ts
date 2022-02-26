import { ICreateUser } from './../domain/models/ICreateUser';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import AuthCofig from '@config/auth';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const authConfig = AuthCofig();
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError(`Email ${email} already exists`);
    }

    password += authConfig.jwt.secret;

    const hashedPassword = await hash(password, 8);

    const User = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return User;
  }
}

export default CreateUserService;
