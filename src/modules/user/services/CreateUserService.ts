import { ICreateUser } from './../domain/models/ICreateUser';
import AppError from '@shared/errors/AppError';
import AuthCofig from '@config/auth';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const authConfig = AuthCofig();
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError(`Email ${email} already exists`);
    }

    password += authConfig.jwt.secret;

    const hashedPassword = await this.hashProvider.generateHash(password);

    const User = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return User;
  }
}

export default CreateUserService;
