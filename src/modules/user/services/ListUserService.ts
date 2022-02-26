import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = this.userRepository.find();

    return users;
  }
}

export default ListUserService;
