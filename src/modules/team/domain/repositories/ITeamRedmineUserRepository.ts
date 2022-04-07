import { ITeamRedmineUser } from '../models/ITeamRedmineUser';
import { ICreateTeamRedmineUserImport } from './../models/ICreateTeam';

export interface ITeamRedmineUserRepository {
  create(
    team_id: string,
    users: ICreateTeamRedmineUserImport[],
  ): Promise<ITeamRedmineUser[]>;
}
