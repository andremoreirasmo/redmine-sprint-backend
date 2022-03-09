import { ITeamTaskCategory } from '../ITeamTaskCategory';
import { ITeamTaskCategoryRedmine } from '../ITeamTaskCategoryRedmine';

export interface ITeamTaskCategoryDTO extends ITeamTaskCategory {
  redmine_categories: ITeamTaskCategoryRedmine[];
}
