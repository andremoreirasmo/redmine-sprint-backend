import { inject, injectable } from 'tsyringe';
import { ITeamActivityRequest } from '../domain/models/ICreateTeamRequest';
import { ITeamActivityRedmineRepository } from '../domain/repositories/ITeamActivityRedmineRepository';
import { ITeamActivityRepository } from '../domain/repositories/ITeamActivityRepository';

@injectable()
class CreateTeamActivityService {
  constructor(
    @inject('TeamActivityRepository')
    private teamActivityRep: ITeamActivityRepository,
    @inject('TeamActivityRepository')
    private teamActivityRedmineRep: ITeamActivityRedmineRepository,
  ) {}

  public async execute(team_id: string, activities: ITeamActivityRequest[]) {
    const activitiesWithTeamId = activities.map(activity => {
      return { ...activity, team_id };
    });

    const savedActivities = await this.teamActivityRep.create(
      activitiesWithTeamId,
    );

    const activitiesRedmineWithActivityId = activities.map((activity, i) => {
      const savedActivity = savedActivities[i];

      const savedRedmineActivities = activity.redmine_activities.map(
        activityRedmine => {
          const saveRedmineActivity = this.teamActivityRedmineRep.create(
            activitiesRedmineWithActivityId,
          );

          return { ...activityRedmine, teamActivity_id: savedActivity.id };
        },
      );
    });

    return team;
  }
}

export default CreateTeamActivityService;
