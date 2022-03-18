import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITeam } from '../domain/models/ITeam';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';

@injectable()
class ListTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute(redmine_id: string): Promise<ITeam> {
    const redmine = await this.redmineRepository.findById(redmine_id);

    if (!redmine || redmine.redmine_users.find(user => user.id === redmine)) {
      throw new AppError('Redmine not found.');
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

    return team;
  }
}

export default ListTeamService;
