import { ITeamActivity } from '@modules/team/domain/models/ITeamActivity';
import { ITeamActivityRepository } from '@modules/team/domain/repositories/ITeamActivityRepository';
import { getRepository, Repository } from 'typeorm';
import TeamActivity from '../entities/TeamActivity';

export class TeamActivityRepository implements ITeamActivityRepository {
  private ormRepository: Repository<TeamActivity>;

  constructor() {
    this.ormRepository = getRepository(TeamActivity);
  }

  public async create(
    teamsActivity: Omit<ITeamActivity, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<ITeamActivity[]> {
    const teamsActivityCreate = this.ormRepository.create(teamsActivity);

    await this.ormRepository.save(teamsActivityCreate);

    return teamsActivityCreate;
  }

  public async save(teamActivity: ITeamActivity[]): Promise<ITeamActivity[]> {
    const teams this.ormRepository.save(teamActivity);

    return teamActivity;
  }
}
