import AppError from '@shared/errors/AppError';
import { hash, compare } from 'bcryptjs';
import AuthCofig from '@config/auth';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<IUser> {
    const authConfig = AuthCofig();

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError(`Email ${email} already exists.`);
    }

    if (password && !old_password) {
      throw new AppError(`Old password is required.`);
    }

    if (password && old_password) {
      old_password += authConfig.jwt.secret;
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError(`Old password does not match.`);
      }

      password += authConfig.jwt.secret;
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
