import EnumRoleRedmine from '../enums/EnumRoleRedmine';
import { IRedmineRepository } from '../domain/repositories/IRedmineRepository';
import { IRedmine } from '../domain/models/IRedmine';
import { IRedmineUser } from '../domain/models/IRedmineUser';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  url: string;
  apiKey: string;
  project_import: number;
}

@injectable()
class CreateRedmineService {
  constructor(
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({
    user_id,
    name,
    url,
    apiKey,
    project_import,
  }: IRequest): Promise<IRedmine> {
    const redmineUser = {
      user: {
        id: user_id,
      },
      role: EnumRoleRedmine.Owner,
    } as IRedmineUser;

    const redmine = await this.redmineRepository.create({
      name,
      url,
      apiKey,
      project_import,
      redmine_users: [redmineUser],
    });

    redmine.redmine_users = [redmineUser];

    return redmine;
  }
}

export default CreateRedmineService;
