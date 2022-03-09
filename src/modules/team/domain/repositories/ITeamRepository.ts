import { ICreateTeam } from '../models/CreateTeam/ICreateTeam';
import { ITeam } from '../models/ITeam';

export interface ITeamRepository {
  create(team: ICreateTeam): Promise<ITeam>;
  save(team: ITeam): Promise<ITeam>;
}
