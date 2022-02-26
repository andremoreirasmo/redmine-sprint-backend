import { IRedmineUser } from './IRedmineUser';

export interface IRedmine {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  redmine_users: IRedmineUser[];
  project_import: number;
  createdAt: Date;
  updatedAt: Date;
}
