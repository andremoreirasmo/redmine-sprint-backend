import { ICreateTeamTaskCategory } from '../models/ICreateTeam';
import { ITeamTaskCategory } from '../models/ITeamTaskCategory';

export interface ITeamTaskCategoryRepository {
  create(
    team_id: string,
    categories: ICreateTeamTaskCategory[],
  ): Promise<ITeamTaskCategory[]>;
}
