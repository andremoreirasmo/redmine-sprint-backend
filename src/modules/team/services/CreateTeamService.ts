import { inject, injectable } from 'tsyringe';
import { ICreateTeamRequest } from '../domain/models/ICreateTeamRequest';
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
  }: ICreateTeamRequest) {
    const team = await this.teamRepository.create({
      name,
      redmine_id,
      hours_per_point,
    });

    const activitiesWithTeamId = activities.map(activity => {
      return { ...activity, team_id: team.id };
    });

    const savedActivities = await this.teamActivityRep.create(
      activitiesWithTeamId,
    );

    const activitiesWithActivityId = activities.map((e, i) => {
      const savedActivity = savedActivities[i];
      return { ...e, teamActivity_id: savedActivity.id };
    });

    await this.teamActivityRedmineRep.create(activitiesWithActivityId);

    return team;
  }
}

export default CreateTeamService;
