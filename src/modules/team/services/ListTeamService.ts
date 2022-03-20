import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITeam } from '../domain/models/ITeam';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';

interface Props {
  user_id: string;
  redmine_id: string;
}

@injectable()
class ListTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({ user_id, redmine_id }: Props): Promise<ITeam[]> {
    const redmine = await this.redmineRepository.findById(redmine_id);

    if (!redmine || !redmine.redmine_users.find(e => e.user_id === user_id)) {
      throw new AppError('Usúario sem permissão.', 401);
    }

    const teams = await this.teamRepository.findByRedmineId(redmine_id);
    return teams;
  }
}

export default ListTeamService;
