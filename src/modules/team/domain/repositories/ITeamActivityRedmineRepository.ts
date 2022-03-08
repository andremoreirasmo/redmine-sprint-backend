import { ICreateTeamActivityRedmine } from '../models/ICreateTeamActivityRedmine';
import { ITeamActivityRedmine } from '../models/ITeamActivityRedmine';

export interface ITeamActivityRedmineRepository {
  create(
    teamActivitiesRedmine: ICreateTeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]>;
  save(
    teamActivitiesRedmine: ITeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]>;
}
