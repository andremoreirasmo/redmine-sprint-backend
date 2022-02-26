import { ICreateRedmine } from '@modules/redmine/domain/models/ICreateRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { getRepository, Repository } from 'typeorm';
import Redmine from '../entities/Redmine';

export class RedmineRepository implements IRedmineRepository {
  private ormRepository: Repository<Redmine>;

  constructor() {
    this.ormRepository = getRepository(Redmine);
  }

  public async create({
    name,
    url,
    apiKey,
    project_import,
    redmine_users,
  }: ICreateRedmine): Promise<IRedmine> {
    const redmine = this.ormRepository.create({
      name,
      url,
      apiKey,
      project_import,
      redmine_users,
    });

    await this.ormRepository.save(redmine);

    return redmine;
  }

  public async save(redmine: IRedmine): Promise<IRedmine> {
    await this.ormRepository.save(redmine);

    return redmine;
  }

  public async findById(id: string): Promise<Redmine | undefined> {
    const redmine = this.ormRepository.findOne(id, {
      relations: ['redmine_users', 'redmine_users.user'],
    });

    return redmine;
  }

  public async findByUserId(user_id: string): Promise<Redmine[]> {
    const redmines = this.ormRepository
      .createQueryBuilder('redmine')
      .leftJoinAndSelect('redmine.redmine_users', 'redmine_users')
      .leftJoinAndSelect('redmine_users.user', 'usr')
      .where('usr.id = :user_id', { user_id })
      .getMany();

    return redmines;
  }

  public async remove(redmine: IRedmine): Promise<void> {
    await this.ormRepository.remove(redmine);
  }
}
