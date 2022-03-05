export interface TeamActivityRedmine {
  redmineActivityId: number;
}

export interface TeamActivity {
  name: string;
  redmine_activities: TeamActivityRedmine[];
}

export interface TeamTaskCategoryRedmine {
  redmineCategoryId: number;
}

export interface TeamTaskCategory {
  name: string;
  productive: boolean;
  redmine_categories: TeamTaskCategoryRedmine[];
}

export interface ICreateTeam {
  name: string;
  redmine_id: string;
  hours_per_point: number;
  activities: TeamActivity[];
  categories: TeamTaskCategory;
}
