import { EntityRepository, Repository } from 'typeorm';
import Redmine from '../entities/Redmine';

@EntityRepository(Redmine)
export class RedmineRepository extends Repository<Redmine> {
  public async findById(id: string): Promise<Redmine | undefined> {
    const redmine = this.findOne(id, {
      relations: ['redmine_users', 'redmine_users.user'],
    });

    return redmine;
  }

  public async findByUserId(user_id: string): Promise<Redmine[]> {
    const redmines = this.createQueryBuilder('redmine')
      .leftJoinAndSelect('redmine.redmine_users', 'redmine_users')
      .leftJoinAndSelect('redmine_users.user', 'usr')
      .where('usr.id = :user_id', { user_id })
      .getMany();

    return redmines;
  }
}
