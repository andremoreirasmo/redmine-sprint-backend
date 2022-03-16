import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import { ITeam } from '../domain/models/ITeam';
import { ITeamActivityRepository } from '../domain/repositories/ITeamActivityRepository';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';
import { ITeamTaskCategoryRepository } from '../domain/repositories/ITeamTaskCategoryRepository';

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('TeamActivityRepository')
    private teamActivityRepository: ITeamActivityRepository,
    @inject('TeamTaskCategoryRepository')
    private teamTaskCategoryRepository: ITeamTaskCategoryRepository,
  ) {}

  public async execute(data: ICreateTeam): Promise<ITeam> {
    const team = (await this.teamRepository.create(data)) as ITeam;

    team.activities = await this.teamActivityRepository.create(
      team.id,
      data.activities,
    );

    team.categories = await this.teamTaskCategoryRepository.create(
      team.id,
      data.categories,
    );

    return team;
  }
}

export default CreateTeamService;
