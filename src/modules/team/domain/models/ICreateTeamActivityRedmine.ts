import { ITeamActivityRedmine } from './ITeamActivityRedmine';

export type ICreateTeamActivityRedmine = Omit<
  ITeamActivityRedmine,
  'id' | 'createdAt' | 'updatedAt'
>;
