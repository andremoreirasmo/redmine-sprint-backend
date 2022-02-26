import AppError from '@shared/errors/AppError';
import EnumRoleRedmine from '../enums/EnumRoleRedmine';
import { inject, injectable } from 'tsyringe';
import { IRedmineRepository } from '../domain/repositories/IRedmineRepository';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteRedmineService {
  constructor(
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const redmine = await this.redmineRepository.findById(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineUser = redmine.redmine_users.find(
      redmine_user => redmine_user.user.id === user_id,
    );

    if (!redmineUser || redmineUser.role === EnumRoleRedmine.Contributor) {
      throw new AppError('User without permission to perform action.', 401);
    }

    this.redmineRepository.remove(redmine);
  }
}

export default DeleteRedmineService;
