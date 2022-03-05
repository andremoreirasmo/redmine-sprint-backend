import { url } from 'inspector';
import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../domain/models/ICreateTeam';
import { ITeamActivityRedmineRepository } from '../domain/repositories/ITeamActivityRedmineRepository';
import { ITeamActivityRepository } from '../domain/repositories/ITeamActivityRepository';
import { ITeamRepository } from '../domain/repositories/ITeamRepository';
import { ITeamTaskCategoryRedmineRepository } from '../domain/repositories/ITeamTaskCategoryRedmineRepository';
import { ITeamTaskCategoryRepository } from '../domain/repositories/ITeamTaskCategoryRepository';

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('TeamActivityRepository')
    private teamActivityRep: ITeamActivityRepository,
    @inject('TeamActivityRepository')
    private teamActivityRedmineRep: ITeamActivityRedmineRepository,
    @inject('TeamActivityRepository')
    private teamTaskCategoryRep: ITeamTaskCategoryRepository,
    @inject('TeamActivityRepository')
    private teamTaskCategoryRedmineRep: ITeamTaskCategoryRedmineRepository,
  ) {}

  public async execute({
    name,
    redmine_id,
    hours_per_point,
    activities,
    categories,
  }: ICreateTeam) {
    const team = await this.teamRepository.create({
      name,
      redmine_id,
      hours_per_point,
    });

    await this.teamActivityRedmineRep.create;
    activities.map(activity => {
      return { ...activity, team_id: team.id };
    });

    return team;
  }
}

export default CreateTeamService;
