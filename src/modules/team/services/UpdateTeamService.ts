import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import { ITeam } from '../domain/models/ITeam';
import { ITeamActivityRepository } from '../domain/repositories/ITeamActivityRepository';
import { ITeamRedmineUserRepository } from '../domain/repositories/ITeamRedmineUserRepository';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';
import { ITeamTaskCategoryRepository } from '../domain/repositories/ITeamTaskCategoryRepository';

interface Props extends ICreateTeam {
  user_id: string;
  team_id: string;
}

@injectable()
class UpdateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
    @inject('TeamActivityRepository')
    private teamActivityRepository: ITeamActivityRepository,
    @inject('TeamTaskCategoryRepository')
    private teamTaskCategoryRepository: ITeamTaskCategoryRepository,
    @inject('TeamRedmineUserRepository')
    private teamRedmineUserRepository: ITeamRedmineUserRepository,
  ) {}

  public async execute({ user_id, team_id, ...data }: Props): Promise<ITeam> {
    const team = await this.teamRepository.findById(team_id);

    if (!team) {
      throw new AppError('Time não encontrado.');
    }

    const redmine = await this.redmineRepository.findById(team.redmine_id);

    if (!redmine || !redmine.redmine_users.find(e => e.user_id === user_id)) {
      throw new AppError('Usúario sem permissão.', 401);
    }

    const teamExists = await this.teamRepository.findByName(data.name);

    if (teamExists && teamExists.id != team_id) {
      throw new AppError(`Já existe um time com o nome ${data.name}.`);
    }

    const updatedTeam = await this.teamRepository.updateAndDeleteRelatedRecords(
      team_id,
      data,
    );

    updatedTeam.activities = await this.teamActivityRepository.create(
      team.id,
      data.activities,
    );

    updatedTeam.categories = await this.teamTaskCategoryRepository.create(
      team.id,
      data.categories,
    );

    team.redmine_users = await this.teamRedmineUserRepository.create(
      team.id,
      data.users_redmine,
    );

    return updatedTeam;
  }
}

export default UpdateTeamService;
