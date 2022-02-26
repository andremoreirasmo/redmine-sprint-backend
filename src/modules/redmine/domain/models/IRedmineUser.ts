import { IUser } from '@modules/user/domain/models/IUser';
import { IRedmine } from './IRedmine';

export interface IRedmineUser {
  id: string;
  role: number;
  user: IUser;
  redmine: IRedmine;
  createdAt: Date;
  updatedAt: Date;
  getRoleLabel(): string;
}
