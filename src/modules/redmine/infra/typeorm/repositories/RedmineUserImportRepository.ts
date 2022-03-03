import { ICreateUserImportRedmine } from '@modules/redmine/domain/models/ICreateUserImportRedmine';
import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import { IRedmineUserImportRepository } from '@modules/redmine/domain/repositories/IRedmineUserImportRepository';
import { getRepository, Repository } from 'typeorm';
import RedmineUserImport from '../entities/RedmineUserImport';

export class RedmineUserImportRepository
  implements IRedmineUserImportRepository
{
  private ormRepository: Repository<RedmineUserImport>;

  constructor() {
    this.ormRepository = getRepository(RedmineUserImport);
  }

  public async findByRedmine(id: string): Promise<IRedmineUserImport[]> {
    const users = this.ormRepository.find({
      where: { redmine_id: id },
    });

    return users;
  }

  public async create(
    user: ICreateUserImportRedmine,
  ): Promise<IRedmineUserImport> {
    const userImport = this.ormRepository.create({
      ...user,
    });

    await this.ormRepository.save(userImport);

    return userImport;
  }

  public async save(user: IRedmineUserImport): Promise<IRedmineUserImport> {
    await this.ormRepository.save(user);

    return user;
  }
}
