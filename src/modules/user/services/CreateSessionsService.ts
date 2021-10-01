import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthCofig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
    rememberMe,
  }: IRequest): Promise<IResponse> {
    const authConfig = AuthCofig();
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    password += authConfig.jwt.secret;

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: rememberMe ? '365d' : authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
