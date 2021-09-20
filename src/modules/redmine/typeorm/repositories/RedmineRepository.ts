import { EntityRepository, Repository } from 'typeorm';
import Redmine from '../entities/Redmine';

@EntityRepository(Redmine)
export class RedmineRepository extends Repository<Redmine> {
  public async findById(id: string): Promise<Redmine | undefined> {
    const redmine = this.findOne(id, {
      relations: ['redmine_users'],
    });

    return redmine;
  }
}
