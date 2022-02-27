import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import AuthCofig from '@config/auth';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
interface IRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
class CreateSessionsService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    rememberMe,
  }: IRequest): Promise<IResponse> {
    const authConfig = AuthCofig();

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    password += authConfig.jwt.secret;

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password,
    );

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
