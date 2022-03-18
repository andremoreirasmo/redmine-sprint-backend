import { IRedmineUser } from '@modules/redmine/domain/models/IRedmineUser';
import User from '@modules/user/domain/entities/User';
import { Type } from 'class-transformer';

class RedmineUser implements IRedmineUser {
  id: string;

  role: number;

  user_id: string;
  @Type(() => User)
  user: User;

  redmine_id: string;

  createdAt: Date;

  updatedAt: Date;
}

export default RedmineUser;
