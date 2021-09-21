import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

class ListRedmineService {
  public async execute({ user_id }: IRequest): Promise<Redmine[]> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmines = await redmineRepository.findByUserId(user_id);

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
