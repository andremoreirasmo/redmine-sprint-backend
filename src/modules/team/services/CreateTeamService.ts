import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import { ITeam } from '../domain/models/ITeam';
import { ITeamActivityRepository } from '../domain/repositories/ITeamActivityRepository';
import { ITeamRedmineUserRepository } from '../domain/repositories/ITeamRedmineUserRepository';
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
    @inject('TeamRedmineUserRepository')
    private teamRedmineUserRepository: ITeamRedmineUserRepository,
  ) {}

  public async execute(data: ICreateTeam): Promise<ITeam> {
    const teamExists = await this.teamRepository.findByName(data.name);

    if (teamExists) {
      throw new AppError(`Já existe um time com o nome ${data.name}.`);
    }

    const team = await this.teamRepository.create(data);

    team.activities = await this.teamActivityRepository.create(
      team.id,
      data.activities,
    );

    team.categories = await this.teamTaskCategoryRepository.create(
      team.id,
      data.categories,
    );

    team.redmine_users = await this.teamRedmineUserRepository.create(
      team.id,
      data.users_redmine,
    );

    return team;
  }
}

export default CreateTeamService;
