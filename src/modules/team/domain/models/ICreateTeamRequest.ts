import { ICreateTeam } from './ICreateTeam';

export interface ITeamActivityRedmineRequest {
  redmineActivityId: number;
}

export interface ITeamActivityRequest {
  name: string;
  redmine_activities: ITeamActivityRedmineRequest[];
}

export interface ITeamTaskCategoryRedmineRequest {
  redmineCategoryId: number;
}

export interface ITeamTaskCategoryRequest {
  name: string;
  productive: boolean;
  redmine_categories: ITeamTaskCategoryRedmineRequest[];
}

export interface ICreateTeamRequest extends ICreateTeam {
  activities: ITeamActivityRequest[];
  categories: ITeamTaskCategoryRequest;
}
