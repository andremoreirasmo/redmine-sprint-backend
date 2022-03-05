import { ITeam } from '../models/ITeam';

export interface ITeamRepository {
  create(user: Omit<ITeam, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITeam>;
  save(user: ITeam): Promise<ITeam>;
}
