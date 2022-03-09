import { ITeamTaskCategoryRedmine } from '../ITeamTaskCategoryRedmine';

export type ICreateTeamTaskCategoryRedmineRequest = Omit<
  ITeamTaskCategoryRedmine,
  'id'
>;
