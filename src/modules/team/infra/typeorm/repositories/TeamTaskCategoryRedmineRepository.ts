import { ITeamTaskCategoryRedmine } from '@modules/team/domain/models/ITeamTaskCategoryRedmine';
import { ITeamTaskCategoryRedmineRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRedmineRepository';
import { getRepository, Repository } from 'typeorm';
import TeamTaskCategoryRedmine from '../entities/TeamTaskCategoryRedmine';

export class TeamTaskCategoryRedmineRepository
  implements ITeamTaskCategoryRedmineRepository
{
  private ormRepository: Repository<TeamTaskCategoryRedmine>;

  constructor() {
    this.ormRepository = getRepository(TeamTaskCategoryRedmine);
  }

  public async create(
    team: ITeamTaskCategoryRedmine,
  ): Promise<ITeamTaskCategoryRedmine> {
    const teamCreate = this.ormRepository.create(team);

    await this.ormRepository.save(teamCreate);

    return teamCreate;
  }

  public async save(
    teamActivity: ITeamTaskCategoryRedmine,
  ): Promise<ITeamTaskCategoryRedmine> {
    await this.ormRepository.save(teamActivity);

    return teamActivity;
  }
}
