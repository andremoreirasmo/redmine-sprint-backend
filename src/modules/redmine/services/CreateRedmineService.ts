import { getCustomRepository } from 'typeorm';
import { RedmineRepository } from '../typeorm/repositories/RedmineRepository';
import Redmine from '../typeorm/entities/Redmine';
import EnumRoleRedmine from '../enums/EnumRoleRedmine';
import RedmineUser from '../typeorm/entities/RedmineUser';

interface IRequest {
  user_id: string;
  name: string;
  url: string;
  apiKey: string;
  project_import: number;
}

class CreateRedmineService {
  public async execute({
    user_id,
    name,
    url,
    apiKey,
    project_import,
  }: IRequest): Promise<Redmine> {
    const redmineRepository = getCustomRepository(RedmineRepository);

    const redmine = redmineRepository.create({
      name,
      url,
      apiKey,
      project_import,
    });

    const redmineUser = {
      user: {
        id: user_id,
      },
      role: EnumRoleRedmine.Owner,
    } as RedmineUser;

    redmine.redmine_users = [redmineUser];

    await redmineRepository.save(redmine);

    return redmine;
  }
}

export default CreateRedmineService;
