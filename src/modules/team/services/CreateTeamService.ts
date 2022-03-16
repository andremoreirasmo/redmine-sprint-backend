import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import { ITeam } from '../domain/models/ITeam';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(data: ICreateTeam): Promise<ITeam> {
    const team = await this.teamRepository.create(data);

    return team;
  }
}

export default CreateTeamService;
