import { IRedmineUser } from '@modules/redmine/domain/models/IRedmineUser';

class RedmineUser implements IRedmineUser {
  id: string;

  role: number;

  user_id: string;

  redmine_id: string;

  createdAt: Date;

  updatedAt: Date;
}

export default RedmineUser;
