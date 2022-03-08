import { ITeam } from './ITeam';

export type ICreateTeam = Omit<ITeam, 'id' | 'createdAt' | 'updatedAt'>;
