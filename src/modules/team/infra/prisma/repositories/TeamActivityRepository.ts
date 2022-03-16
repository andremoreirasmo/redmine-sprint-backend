import { ICreateTeamActivity } from '@modules/team/domain/models/ICreateTeam';
import { ITeamActivity } from '@modules/team/domain/models/ITeamActivity';
import { ITeamActivityRepository } from '@modules/team/domain/repositories/ITeamActivityRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamActivityRepository implements ITeamActivityRepository {
  public async create(
    team_id: string,
    activities: ICreateTeamActivity[],
  ): Promise<ITeamActivity[]> {
    const activitiesCreated = prismaClient.$transaction(
      activities.map(activity =>
        prismaClient.team_activity.create({
          data: {
            ...activity,
            activities_redmine: {
              createMany: { data: activity.redmine_activities },
            },
            team_id,
          },
        }),
      ),
    );

    return activitiesCreated;
  }
}
