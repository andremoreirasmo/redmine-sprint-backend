import { EntityRepository, Repository } from 'typeorm';
import RedmineUser from '../entities/RedmineUser';

@EntityRepository(RedmineUser)
export class RedmineUserRepository extends Repository<RedmineUser> {}
