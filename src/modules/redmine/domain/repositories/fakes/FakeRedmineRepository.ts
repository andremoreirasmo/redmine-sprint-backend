import { ICreateRedmine } from '@modules/redmine/domain/models/ICreateRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { v4 as uuidv4 } from 'uuid';

export class FakeRedmineRepository implements IRedmineRepository {
  private redmines: IRedmine[] = [];

  public async create({
    name,
    url,
    apiKey,
    project_import,
    redmine_users,
  }: ICreateRedmine): Promise<Partial<IRedmine>> {
    const redmine = {
      id: uuidv4(),
      name,
      url,
      apiKey,
      project_import,
      redmine_users,
    } as IRedmine;

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

  public async findById(id: string): Promise<Partial<IRedmine> | null> {
    const redmine = this.redmines.find(redmine => redmine.id === id);
    return redmine ?? null;
  }

  public async findByUserId(user_id: string): Promise<IRedmine[]> {
    return [];
  }

  public async remove(redmine: IRedmine): Promise<void> {
    return;
  }
}
