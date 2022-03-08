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

    const activitiesRedmineWithActivityId = activities
      .map((activity, i) => {
        const savedActivity = savedActivities[i];

        return activity.redmine_activities.map(activityRedmine => {
          return { ...activityRedmine, teamActivity_id: savedActivity.id };
        });
      })
      .flatMap(activityRedmine => activityRedmine);

    await this.teamActivityRedmineRep.create(activitiesRedmineWithActivityId);

    const categoriesWithTeamId = categories.map(category => {
      return { ...category, team_id: team.id };
    });

    const savedCategories = await this.teamTaskCategoryRep.create(
      categoriesWithTeamId,
    );

    const categoriesRedmineWithActivityId = categories
      .map((category, i) => {
        const savedCategory = savedCategories[i];

        return category.redmine_categories.map(categoryRedmine => {
          return {
            ...categoryRedmine,
            team_task_category_id: savedCategory.id,
          };
        });
      })
      .flatMap(categoryRedmine => categoryRedmine);

    await this.teamTaskCategoryRedmineRep.create(
      categoriesRedmineWithActivityId,
    );

    return team;
  }
}

export default CreateTeamService;
