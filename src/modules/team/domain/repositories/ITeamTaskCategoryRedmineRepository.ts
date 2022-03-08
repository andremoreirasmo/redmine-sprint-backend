import { ITeamTaskCategoryRedmine } from '../models/ITeamTaskCategoryRedmine';

export interface ITeamTaskCategoryRedmineRepository {
  create(
    categoriesRedmine: ITeamTaskCategoryRedmine[],
  ): Promise<ITeamTaskCategoryRedmine[]>;
  save(
    categoriesRedmine: ITeamTaskCategoryRedmine[],
  ): Promise<ITeamTaskCategoryRedmine[]>;
}
