import { IUser } from '@modules/user/domain/models/IUser';
import { Exclude } from 'class-transformer';

class User implements IUser {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}

export default User;
