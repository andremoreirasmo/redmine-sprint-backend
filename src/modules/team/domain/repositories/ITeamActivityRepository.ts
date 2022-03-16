import { ICreateTeamActivity } from '../models/ICreateTeam';
import { ITeamActivity } from '../models/ITeamActivity';

export interface ITeamActivityRepository {
  create(
    team_id: string,
    activities: ICreateTeamActivity[],
  ): Promise<ITeamActivity[]>;
}
