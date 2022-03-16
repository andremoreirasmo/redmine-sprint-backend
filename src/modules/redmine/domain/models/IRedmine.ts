import { ITeam } from '@modules/team/domain/models/ITeam';
import { IRedmineUser } from './IRedmineUser';
import { IRedmineUserImport } from './IRedmineUserImport';

export interface IRedmine {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  project_import: number;
  createdAt: Date;
  updatedAt: Date;
  redmine_users: IRedmineUser[];
  redmine_users_import: IRedmineUserImport[];
  teams: ITeam[];
}
