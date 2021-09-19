import AppError from '@shared/errors/AppError';
import { hash, compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AuthCofig from '@config/auth';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const authConfig = AuthCofig();
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await userRepository.findByEmail(email);

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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
