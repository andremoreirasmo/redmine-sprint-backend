export interface ICreateTeamActivityRedmine {
  redmine_activity_id: number;
}

export interface ICreateTeamActivity {
  name: string;
  redmine_activities: ICreateTeamActivityRedmine[];
}

export interface ICreateTeamTaskCategoryRedmine {
  redmine_category_id: number;
}

export interface ICreateTeamTaskCategory {
  name: string;
  productive: boolean;
  redmine_categories: ICreateTeamTaskCategoryRedmine[];
}

export interface ICreateTeam {
  name: string;
  redmine_id: string;
  hours_per_point: number;
  activities: ICreateTeamActivity[];
  categories: ICreateTeamTaskCategory[];
}
