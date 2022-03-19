import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';

interface Props {
  user_id: string;
  team_id: string;
}

@injectable()
class DeleteTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('RedmineRepository')
    private redmineRepository: IRedmineRepository,
  ) {}

  public async execute({ user_id, team_id }: Props): Promise<void> {
    const team = await this.teamRepository.findById(team_id);

    if (!team) {
      throw new AppError('Time não encontrado.');
    }

    const redmine = await this.redmineRepository.findById(team.redmine_id);

    if (!redmine || redmine.redmine_users.find(user => user.id === user_id)) {
      throw new AppError('Usúario sem permissão.', 401);
    }

    await this.teamRepository.deleteById(team.id);
  }
}

export default DeleteTeamService;
