import { ITeamActivity } from './ITeamActivity';
import { ITeamRedmineUser } from './ITeamRedmineUser';
import { ITeamTaskCategory } from './ITeamTaskCategory';
export interface ITeam {
  id: string;
  name: string;
  hours_per_point: number;
  redmine_id: string;
  createdAt: Date;
  updatedAt: Date;
  activities: ITeamActivity[];
  categories: ITeamTaskCategory[];
  redmine_users: ITeamRedmineUser[];
}
