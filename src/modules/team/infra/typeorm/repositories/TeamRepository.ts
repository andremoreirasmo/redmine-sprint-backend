import { ITeam } from '@modules/team/domain/models/ITeam';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { getRepository, Repository } from 'typeorm';
import Team from '../entities/Team';

export class TeamRepository implements ITeamRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

  public async create(
    team: Omit<ITeam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ITeam> {
    const teamCreate = this.ormRepository.create(team);

    await this.ormRepository.save(teamCreate);

    return teamCreate;
  }

  public async save(team: ITeam): Promise<ITeam> {
    await this.ormRepository.save(team);

    return team;
  }
}
