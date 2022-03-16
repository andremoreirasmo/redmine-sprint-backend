import { ITeamTaskCategory } from '@modules/team/domain/models/ITeamTaskCategory';
import { ITeamTaskCategoryRepository } from '@modules/team/domain/repositories/ITeamTaskCategoryRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';
import { ICreateTeamTaskCategory } from './../../../domain/models/ICreateTeam';

export class TeamTaskCategoryRepository implements ITeamTaskCategoryRepository {
  public async create(
    team_id: string,
    categories: ICreateTeamTaskCategory[],
  ): Promise<ITeamTaskCategory[]> {
    const categoriesCreated = prismaClient.$transaction(
      categories.map(category =>
        prismaClient.team_task_category.create({
          data: {
            ...category,
            categories_redmine: {
              createMany: { data: category.redmine_categories },
            },
            team_id,
          },
        }),
      ),
    );

    return categoriesCreated;
  }
}
