import { ICreateTeamTaskCategoryRedmineRequest } from '../models/CreateTeam/ICreateTeamTaskCategoryRedmineRequest';
import { ITeamTaskCategoryRedmine } from '../models/ITeamTaskCategoryRedmine';

export interface ITeamTaskCategoryRedmineRepository {
  create(
    categoriesRedmine: ICreateTeamTaskCategoryRedmineRequest[],
  ): Promise<ITeamTaskCategoryRedmine[]>;
  save(
    categoriesRedmine: ITeamTaskCategoryRedmine[],
  ): Promise<ITeamTaskCategoryRedmine[]>;
}
