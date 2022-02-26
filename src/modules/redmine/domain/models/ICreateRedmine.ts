import { IRedmineUser } from './IRedmineUser';

export interface ICreateRedmine {
  name: string;
  url: string;
  apiKey: string;
  project_import: number;
  redmine_users: IRedmineUser[];
}
