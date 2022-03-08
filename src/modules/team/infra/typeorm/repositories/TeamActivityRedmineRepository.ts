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
    teamActivities: ITeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]> {
    const savedteamActivities = this.ormRepository.create(teamActivities);

    await this.ormRepository.save(savedteamActivities);

    return savedteamActivities;
  }

  public async save(
    teamActivities: ITeamActivityRedmine[],
  ): Promise<ITeamActivityRedmine[]> {
    await this.ormRepository.save(teamActivities);

    return teamActivities;
  }
}
