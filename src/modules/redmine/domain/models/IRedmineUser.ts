import { IRedmine } from './IRedmine';

export interface IRedmineUser {
  id: string;
  role: number;
  user_id: string;
  redmine: IRedmine;
  createdAt: Date;
  updatedAt: Date;
  getRoleLabel(): string;
}
