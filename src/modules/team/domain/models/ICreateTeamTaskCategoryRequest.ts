import { ITeamTaskCategory } from './ITeamTaskCategory';

export type ICreateTeamTaskCategoryRequest = Omit<
  ITeamTaskCategory,
  'id' | 'createdAt' | 'updatedAt'
>;
