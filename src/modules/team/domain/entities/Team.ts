import { Type } from 'class-transformer';
import { ITeam } from '../models/ITeam';
import TeamActivity from './TeamActivity';
import TeamRedmineUser from './TeamRedmineUser';
import TeamTaskCategory from './TeamTaskCategory';

class Team implements ITeam {
  id: string;

  name: string;

  hours_per_point: number;

  redmine_id: string;

  createdAt: Date;

  updatedAt: Date;

  @Type(() => TeamActivity)
  activities: TeamActivity[];

  @Type(() => TeamTaskCategory)
  categories: TeamTaskCategory[];

  @Type(() => TeamRedmineUser)
  redmine_users: TeamRedmineUser[];
}

export default Team;
