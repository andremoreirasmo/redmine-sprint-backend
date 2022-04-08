import TeamActivity from '@modules/team/domain/entities/TeamActivity';
import { ICreateTeamActivity } from '@modules/team/domain/models/ICreateTeam';
import { ITeamActivity } from '@modules/team/domain/models/ITeamActivity';
import { ITeamActivityRepository } from '@modules/team/domain/repositories/ITeamActivityRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamActivityRepository implements ITeamActivityRepository {
  public async create(
    team_id: string,
    activities: ICreateTeamActivity[],
  ): Promise<ITeamActivity[]> {
    const activitiesCreated = await prismaClient.$transaction(
      activities.map(activity => {
        const activities_redmine = activity.redmine_activities.map(e => {
          return { redmine_activity_id: e.id };
        });

        return prismaClient.team_activity.create({
          data: {
            name: activity.name,
            activities_redmine: {
              createMany: { data: activities_redmine },
            },
            team_id,
          },
        });
      }),
    );

    return recordToEntity(TeamActivity, activitiesCreated);
  }
}
