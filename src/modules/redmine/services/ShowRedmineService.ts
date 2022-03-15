import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IRedmine } from '../domain/models/IRedmine';
import { IRedmineRepository } from '../domain/repositories/IRedmineRepository';

interface IRequest {
  user_id: string;
  id: string;
}
@injectable()
class ShowRedmineService {
  constructor(
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<IRedmine> {
    const redmine = await this.redmineRepository.findById(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineUser = redmine.redmine_users.find(
      redmine_user => redmine_user.user_id === user_id,
    );

    if (!redmineUser) {
      throw new AppError('User without permission to perform action.', 401);
    }

    return classToClass(redmine, {
      groups: [redmineUser.getRoleLabel()],
    });
  }
}

export default ShowRedmineService;
