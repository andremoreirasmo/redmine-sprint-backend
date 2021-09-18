import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import AuthCofig from '@config/auth';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const authConfig = AuthCofig();
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await userRepository.findById(userToken.id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    password += authConfig.jwt.secret;
    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
