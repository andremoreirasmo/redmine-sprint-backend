import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import AppError from '@shared/errors/AppError';
import EnumRoleRedmine from '../Enums/EnumRoleRedmine';

interface IRequest {
  user_id: string;
  id: string;
}

class DeleteRedmineService {
  public async execute({ user_id, id }: IRequest): Promise<void> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = await redmineRepository.findById(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineUser = redmine.redmine_users.find(
      redmine_user => redmine_user.user.id === user_id,
    );

    if (!redmineUser || redmineUser.role === EnumRoleRedmine.Contributor) {
      throw new AppError('User without permission to perform action.', 401);
    }

    redmineRepository.remove(redmine);
  }
}

export default DeleteRedmineService;
