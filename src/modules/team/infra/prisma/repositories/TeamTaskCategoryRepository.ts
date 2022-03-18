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
      categories.map(category => {
        const categories_redmine = category.redmine_categories.map(id => {
          return { redmine_category_id: id };
        });

        return prismaClient.team_task_category.create({
          data: {
            name: category.name,
            productive: category.productive,
            categories_redmine: {
              createMany: { data: categories_redmine },
            },
            team_id,
          },
        });
      }),
    );

    return categoriesCreated;
  }
}
