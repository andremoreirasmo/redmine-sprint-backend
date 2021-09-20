import { RedmineUserRepository } from './../typeorm/repositories/RedmineUserRepository';
import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import EnumRoleRedmine from '../Enums/EnumRoleRedmine';

interface IRequest {
  user_id: string;
  name: string;
  url: string;
  apiKey: string;
}

class CreateRedmineService {
  public async execute({
    user_id,
    name,
    url,
    apiKey,
  }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = redmineRepository.create({
      name,
      url,
      apiKey,
    });

    const redmineUserRepository = getCustomRepository(RedmineUserRepository);
    const redmineUser = redmineUserRepository.create({
      user: {
        id: user_id,
      },
      role: EnumRoleRedmine.Owner,
    });

    redmine.redmine_users = [redmineUser];

    await redmineRepository.save(redmine);

    return redmine;
  }
}

export default CreateRedmineService;
