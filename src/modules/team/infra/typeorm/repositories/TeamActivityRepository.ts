import { ICreateTeamActivity } from '@modules/team/domain/models/CreateTeam/ICreateTeamActivity';
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
    teamActivities: ICreateTeamActivity[],
  ): Promise<ITeamActivity[]> {
    const teamActivitiesCreate = this.ormRepository.create(teamActivities);

    await this.ormRepository.save(teamActivitiesCreate);

    return teamActivitiesCreate;
  }

  public async save(teamActivities: ITeamActivity[]): Promise<ITeamActivity[]> {
    await this.ormRepository.save(teamActivities);

    return teamActivities;
  }
}
