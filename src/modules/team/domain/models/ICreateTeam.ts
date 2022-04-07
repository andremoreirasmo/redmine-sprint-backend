export interface ICreateTeamActivity {
  name: string;
  redmine_activities: number[];
}

export interface ICreateTeamTaskCategory {
  name: string;
  productive: boolean;
  redmine_categories: number[];
}

export interface ICreateTeamRedmineUserImport {
  id: string;
}

export interface ICreateTeam {
  name: string;
  redmine_id: string;
  hours_per_point: number;
  activities: ICreateTeamActivity[];
  categories: ICreateTeamTaskCategory[];
  users_redmine: ICreateTeamRedmineUserImport[];
}
