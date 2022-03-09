import { ICreateTeamActivity } from '../models/CreateTeam/ICreateTeamActivity';
import { ITeamActivity } from '../models/ITeamActivity';

export interface ITeamActivityRepository {
  create(teamActivities: ICreateTeamActivity[]): Promise<ITeamActivity[]>;
  save(teamActivities: ITeamActivity[]): Promise<ITeamActivity[]>;
}
