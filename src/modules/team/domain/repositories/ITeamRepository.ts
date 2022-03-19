import { ICreateTeam } from '../models/ICreateTeam';
import { ITeam } from '../models/ITeam';

export interface ITeamRepository {
  create(data: ICreateTeam): Promise<ITeam>;
  updateAndDeleteRelatedRecords(id: string, data: ICreateTeam): Promise<ITeam>;
  findByRedmineId(redmine_id: string): Promise<ITeam[]>;
  findByName(name: string): Promise<ITeam | null>;
  findById(id: string): Promise<ITeam | null>;
  deleteById(id: string): Promise<void>;
}
