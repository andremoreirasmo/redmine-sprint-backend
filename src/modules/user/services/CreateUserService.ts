import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AuthCofig from '@config/auth';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const authConfig = AuthCofig();
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError(`Email ${email} already exists`);
    }

    password += authConfig.jwt.secret;

    const hashedPassword = await hash(password, 8);

    const User = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(User);

    return User;
  }
}

export default CreateUserService;
