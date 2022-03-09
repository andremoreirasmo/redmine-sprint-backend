import { inject, injectable } from 'tsyringe';
import {
  ICreateTeamRequest,
  ITeamActivityRequest,
  ITeamTaskCategoryRequest,
} from '../domain/models/CreateTeam/ICreateTeamRequest';
import { ITeamActivityDTO } from '../domain/models/DTO/ITeamActivityDTO';
import { ITeamDTO } from '../domain/models/DTO/ITeamDTO';
import { ITeamTaskCategoryDTO } from '../domain/models/DTO/ITeamTaskCategoryDTO';
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
    @inject('TeamActivityRedmineRepository')
    private teamActivityRedmineRep: ITeamActivityRedmineRepository,
    @inject('TeamTaskCategoryRepository')
    private teamTaskCategoryRep: ITeamTaskCategoryRepository,
    @inject('TeamTaskCategoryRedmineRepository')
    private teamTaskCategoryRedmineRep: ITeamTaskCategoryRedmineRepository,
  ) {}

  public async execute({
    activities,
    categories,
    ...rest
  }: ICreateTeamRequest): Promise<ITeamDTO> {
    const team = await this.teamRepository.create({
      ...rest,
    });

    const saveActivities = await this.saveActivities(team.id, activities);

    const saveCategories = await this.saveCategories(team.id, categories);

    return { ...team, activities: saveActivities, categories: saveCategories };
  }

  private async saveCategories(
    team_id: string,
    categories: ITeamTaskCategoryRequest[],
  ) {
    const categoriesWithTeamId = categories.map(category => {
      return { ...category, team_id };
    });

    const savedCategories = await this.teamTaskCategoryRep.create(
      categoriesWithTeamId,
    );

    const categoriesDTO = await Promise.all(
      categories.map(async (category, i) => {
        const savedCategory = savedCategories[i];

        const categoriesRedmineWithOwnerId = category.redmine_categories.map(
          categoryRedmine => {
            return {
              ...categoryRedmine,
              team_task_category_id: savedCategory.id,
            };
          },
        );

        const savedCategoriesRedmine =
          await this.teamTaskCategoryRedmineRep.create(
            categoriesRedmineWithOwnerId,
          );

        return {
          ...savedCategory,
          redmine_categories: savedCategoriesRedmine,
        } as ITeamTaskCategoryDTO;
      }),
    );

    return categoriesDTO;
  }

  private async saveActivities(
    team_id: string,
    activities: ITeamActivityRequest[],
  ) {
    const activitiesWithTeamId = activities.map(activity => {
      return { ...activity, team_id };
    });

    const savedActivities = await this.teamActivityRep.create(
      activitiesWithTeamId,
    );

    const activitiesDTO = await Promise.all(
      activities.map(async (activity, i) => {
        const savedActivity = savedActivities[i];

        const activitiesRedmineWithOwnerId = activity.redmine_activities.map(
          activityRedmine => {
            return { ...activityRedmine, teamActivity_id: savedActivity.id };
          },
        );

        const savedActivitiesRedmine = await this.teamActivityRedmineRep.create(
          activitiesRedmineWithOwnerId,
        );

        return {
          ...savedActivity,
          redmine_activities: savedActivitiesRedmine,
        } as ITeamActivityDTO;
      }),
    );

    return activitiesDTO;
  }
}

export default CreateTeamService;
