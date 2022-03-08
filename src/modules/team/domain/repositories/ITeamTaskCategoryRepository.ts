import { ICreateTeamTaskCategoryRequest } from '../models/ICreateTeamTaskCategoryRequest';
import { ITeamTaskCategory } from '../models/ITeamTaskCategory';

export interface ITeamTaskCategoryRepository {
  create(
    categories: ICreateTeamTaskCategoryRequest[],
  ): Promise<ITeamTaskCategory[]>;
  save(teamActivity: ITeamTaskCategory[]): Promise<ITeamTaskCategory[]>;
}
