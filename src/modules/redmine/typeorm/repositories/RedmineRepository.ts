import { EntityRepository, Repository } from 'typeorm';
import Redmine from '../entities/Redmine';

@EntityRepository(Redmine)
export class RedmineRepository extends Repository<Redmine> {
  public async findByName(name: string): Promise<Redmine | undefined> {
    const redmine = this.findOne({
      where: {
        name,
      },
    });

    return redmine;
  }
}
