import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
  id: string;
  name: string;
  url: string;
  apiKey: string;
}

class UpdateRedmineService {
  public async execute({
    user_id,
    id,
    name,
    url,
    apiKey,
  }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = await redmineRepository.findById(id);

    if (!redmine) {
      throw new AppError('Redmine not found.');
    }

    const redmineUser = redmine.redmine_users.find(
      redmine_user => redmine_user.user.id === user_id,
    );

    if (!redmineUser) {
      throw new AppError('User without permission to perform action.', 401);
    }

    redmine.name = name;
    redmine.url = url;
    redmine.apiKey = apiKey;

    await redmineRepository.save(redmine);

    return classToClass(redmine, {
      groups: [redmineUser.getRoleLabel()],
    });
  }
}

export default UpdateRedmineService;
