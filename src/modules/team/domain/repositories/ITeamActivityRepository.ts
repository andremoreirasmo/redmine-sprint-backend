import { ITeamActivity } from '../models/ITeamActivity';

export interface ITeamActivityRepository {
  create(
    team: Omit<ITeamActivity, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<ITeamActivity>;
  save(teamActivity: ITeamActivity): Promise<ITeamActivity>;
}
