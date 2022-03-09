import { ICreateTeamActivityRedmine } from '@modules/team/domain/models/CreateTeam/ICreateTeamActivityRedmine';
import { ITeamActivityRedmine } from '@modules/team/domain/models/ITeamActivityRedmine';
import { ITeamActivityRedmineRepository } from '@modules/team/domain/repositories/ITeamActivityRedmineRepository';
import { getRepository, Repository } from 'typeorm';
import TeamActivityRedmine from '../entities/TeamActivityRedmine';

export class TeamActivityRedmineRepository
  implements ITeamActivityRedmineRepository
{
  private ormRepository: Repository<TeamActivityRedmine>;

  constructor() {
    this.ormRepository = getRepository(TeamActivityRedmine);
  }

  public async create(
    teamActivitiesRedmine: ICreateTeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]> {
    const savedteamActivities = this.ormRepository.create(
      teamActivitiesRedmine,
    );

    await this.ormRepository.save(savedteamActivities);

    return savedteamActivities;
  }

  public async save(
    teamActivitiesRedmine: ITeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]> {
    await this.ormRepository.save(teamActivitiesRedmine);

    return teamActivitiesRedmine;
  }
}
