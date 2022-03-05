import { ITeamTaskCategory } from '../models/ITeamTaskCategory';

export interface ITeamTaskCategoryRepository {
  create(
    team: Omit<ITeamTaskCategory, 'createdAt, updatedAt'>,
  ): Promise<ITeamTaskCategory>;
  save(teamActivity: ITeamTaskCategory): Promise<ITeamTaskCategory>;
}
