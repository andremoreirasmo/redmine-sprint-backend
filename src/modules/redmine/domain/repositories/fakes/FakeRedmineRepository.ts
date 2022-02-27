import { v4 as uuidv4 } from 'uuid';
import { ICreateRedmine } from '@modules/redmine/domain/models/ICreateRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import Redmine from '@modules/redmine/infra/typeorm/entities/Redmine';

export class FakeRedmineRepository implements IRedmineRepository {
  private redmines: Redmine[] = [];

  public async create({
    name,
    url,
    apiKey,
    project_import,
    redmine_users,
  }: ICreateRedmine): Promise<IRedmine> {
    const redmine = new Redmine();

    redmine.id = uuidv4();
    redmine.name = name;
    redmine.url = url;
    redmine.apiKey = apiKey;
    redmine.project_import = project_import;
    redmine.redmine_users = redmine_users;

    this.redmines.push(redmine);

    return redmine;
  }

  public async save(redmine: IRedmine): Promise<IRedmine> {
    const findIndex = this.redmines.findIndex(
      findRedmine => findRedmine.id === redmine.id,
    );

    this.redmines[findIndex] = redmine;

    return redmine;
  }

  public async findById(id: string): Promise<Redmine | undefined> {
    const redmine = this.redmines.find(redmine => redmine.id === id);
    return redmine;
  }

  public async findByUserId(user_id: string): Promise<IRedmine[]> {
    return [];
  }

  public async remove(redmine: IRedmine): Promise<void> {
    return;
  }
}
