import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IRedmine } from '../domain/models/IRedmine';
import { IRedmineRepository } from '../domain/repositories/IRedmineRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRedmineService {
  constructor(
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IRedmine[]> {
    const redmines = await this.redmineRepository.findByUserId(user_id);

    const redmineTransformed = redmines.map(redmine => {
      const redmineUser = redmine.redmine_users.find(
        redmine_user => redmine_user.user.id === user_id,
      );

      if (redmineUser) {
        return classToClass(redmine, {
          groups: [redmineUser.getRoleLabel()],
        });
      }

      return redmine;
    });

    return redmineTransformed;
  }
}

export default ListRedmineService;
