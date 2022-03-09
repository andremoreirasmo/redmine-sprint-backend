import { ICreateTeamTaskCategoryRedmineRequest } from '@modules/team/domain/models/CreateTeam/ICreateTeamTaskCategoryRedmineRequest';
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
    categoriesRedmine: ICreateTeamTaskCategoryRedmineRequest[],
  ): Promise<ITeamTaskCategoryRedmine[]> {
    const categoriesRedmineCreate =
      this.ormRepository.create(categoriesRedmine);

    await this.ormRepository.save(categoriesRedmineCreate);

    return categoriesRedmineCreate;
  }

  public async save(
    categoriesRedmine: ITeamTaskCategoryRedmine[],
  ): Promise<ITeamTaskCategoryRedmine[]> {
    await this.ormRepository.save(categoriesRedmine);

    return categoriesRedmine;
  }
}
