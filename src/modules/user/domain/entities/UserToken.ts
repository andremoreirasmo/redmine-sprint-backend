import { IUserToken } from '@modules/user/domain/models/IUserToken';

class UserToken implements IUserToken {
  id: string;

  token: string;

  user_id: string;

  createdAt: Date;

  updatedAt: Date;
}

export default UserToken;
