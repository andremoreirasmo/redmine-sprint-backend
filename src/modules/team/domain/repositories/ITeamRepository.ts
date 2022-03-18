import { ICreateTeam } from '../models/ICreateTeam';
import { ITeam } from '../models/ITeam';

export interface ITeamRepository {
  create(data: ICreateTeam): Promise<ITeam>;
  save(team: ITeam): Promise<ITeam>;
  findByRedmineId(redmine_id: string): Promise<ITeam[]>;
  findByName(name: string): Promise<ITeam | null>;
  findById(id: string): Promise<ITeam | null>;
}
