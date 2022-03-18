import { Type } from 'class-transformer';
import { ITeam } from '../models/ITeam';
import TeamActivity from './ITeamActivity';
import TeamTaskCategory from './ITeamTaskCategory';

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
}

export default Team;
