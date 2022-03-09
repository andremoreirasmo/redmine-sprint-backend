import { ICreateTeam } from './ICreateTeam';
import { ICreateTeamActivity } from './ICreateTeamActivity';
import { ICreateTeamTaskCategoryRequest } from './ICreateTeamTaskCategoryRequest';

export interface ITeamActivityRedmineRequest {
  redmine_activity_id: number;
}

export interface ITeamActivityRequest extends ICreateTeamActivity {
  redmine_activities: ITeamActivityRedmineRequest[];
}

export interface ITeamTaskCategoryRedmineRequest {
  redmineCategoryId: number;
}

export interface ITeamTaskCategoryRequest
  extends ICreateTeamTaskCategoryRequest {
  redmine_categories: ITeamTaskCategoryRedmineRequest[];
}

export interface ICreateTeamRequest extends ICreateTeam {
  activities: ITeamActivityRequest[];
  categories: ITeamTaskCategoryRequest[];
}
