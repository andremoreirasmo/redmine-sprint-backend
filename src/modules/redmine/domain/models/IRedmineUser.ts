import { IUser } from '@modules/user/domain/models/IUser';

export interface IRedmineUser {
  id: string;
  role: number;
  user_id: string;
  user: IUser;
  redmine_id: string;
  createdAt: Date;
  updatedAt: Date;
}
