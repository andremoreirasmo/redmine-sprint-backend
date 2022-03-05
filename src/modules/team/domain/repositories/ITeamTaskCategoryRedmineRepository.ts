import { ITeamTaskCategoryRedmine } from '../models/ITeamTaskCategoryRedmine';

export interface ITeamTaskCategoryRedmineRepository {
  create(team: ITeamTaskCategoryRedmine): Promise<ITeamTaskCategoryRedmine>;
  save(
    teamActivity: ITeamTaskCategoryRedmine,
  ): Promise<ITeamTaskCategoryRedmine>;
}
