import { ICreateTeamTaskCategoryRequest } from '@modules/team/domain/models/CreateTeam/ICreateTeamTaskCategoryRequest';
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
    categories: ICreateTeamTaskCategoryRequest[],
  ): Promise<ITeamTaskCategory[]> {
    const categoriesCreate = this.ormRepository.create(categories);

    await this.ormRepository.save(categoriesCreate);

    return categoriesCreate;
  }

  public async save(
    teamActivity: ITeamTaskCategory[],
  ): Promise<ITeamTaskCategory[]> {
    await this.ormRepository.save(teamActivity);

    return teamActivity;
  }
}
