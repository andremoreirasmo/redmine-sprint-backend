import { ITeamActivityRedmine } from '../models/ITeamActivityRedmine';

export interface ITeamActivityRedmineRepository {
  create(team: ITeamActivityRedmine): Promise<ITeamActivityRedmine>;
  save(teamActivity: ITeamActivityRedmine): Promise<ITeamActivityRedmine>;
}
