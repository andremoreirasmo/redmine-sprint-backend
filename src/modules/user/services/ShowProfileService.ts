import AppError from '@shared/errors/AppError';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
