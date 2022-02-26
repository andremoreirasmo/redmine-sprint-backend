import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import AuthCofig from '@config/auth';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const authConfig = AuthCofig();

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

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

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
