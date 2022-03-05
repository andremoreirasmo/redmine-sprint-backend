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
    team: ITeamActivityRedmine,
  ): Promise<ITeamActivityRedmine> {
    const teamCreate = this.ormRepository.create(team);

    await this.ormRepository.save(teamCreate);

    return teamCreate;
  }

  public async save(
    teamActivity: ITeamActivityRedmine,
  ): Promise<ITeamActivityRedmine> {
    await this.ormRepository.save(teamActivity);

    return teamActivity;
  }
}
