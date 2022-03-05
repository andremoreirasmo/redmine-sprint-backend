import { ITeamTaskCategory } from '@modules/team/domain/models/ITeamTaskCategory';
import { ITeamTaskCategoryRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRepository';
import { getRepository, Repository } from 'typeorm';
import TeamTaskCategory from '../entities/TeamTaskCategory';

export class TeamTaskCategoryRepository implements ITeamTaskCategoryRepository {
  private ormRepository: Repository<TeamTaskCategory>;

  constructor() {
    this.ormRepository = getRepository(TeamTaskCategory);
  }

  public async create(
    team: Omit<ITeamTaskCategory, 'createdAt, updatedAt'>,
  ): Promise<ITeamTaskCategory> {
    const teamCreate = this.ormRepository.create(team);

    await this.ormRepository.save(teamCreate);

    return teamCreate;
  }

  public async save(
    teamActivity: ITeamTaskCategory,
  ): Promise<ITeamTaskCategory> {
    await this.ormRepository.save(teamActivity);

    return teamActivity;
  }
}
