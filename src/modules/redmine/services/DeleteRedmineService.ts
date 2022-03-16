import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import EnumRoleRedmine from '../domain/enums/EnumRoleRedmine';
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
    const redmine = (await this.redmineRepository.findById(id)) as IRedmine;

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineUser = redmine.redmine_users.find(
      redmine_user => redmine_user.user_id === user_id,
    );

    if (!redmineUser || redmineUser.role === EnumRoleRedmine.Contributor) {
      throw new AppError('User without permission to perform action.', 401);
    }

    this.redmineRepository.remove(redmine);
  }
}

export default DeleteRedmineService;
