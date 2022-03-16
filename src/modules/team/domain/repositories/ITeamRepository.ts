import { ICreateTeam } from '../models/ICreateTeam';
import { ITeam } from '../models/ITeam';

export interface ITeamRepository {
  create(data: ICreateTeam): Promise<Partial<ITeam>>;
  save(team: ITeam): Promise<Partial<ITeam>>;
}
