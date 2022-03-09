import { ITeamActivity } from '../ITeamActivity';

export type ICreateTeamActivity = Omit<
  ITeamActivity,
  'id' | 'createdAt' | 'updatedAt'
>;
