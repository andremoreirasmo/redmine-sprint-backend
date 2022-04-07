import TeamRedmineUser from '@modules/team/domain/entities/TeamRedmineUser';
import { ICreateTeamRedmineUserImport } from '@modules/team/domain/models/ICreateTeam';
import { ITeamRedmineUser } from '@modules/team/domain/models/ITeamRedmineUser';
import { ITeamRedmineUserRepository } from '@modules/team/domain/repositories/ITeamRedmineUserRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamRedmineUserRepository implements ITeamRedmineUserRepository {
  public async create(
    team_id: string,
    users: ICreateTeamRedmineUserImport[],
  ): Promise<ITeamRedmineUser[]> {
    const usersCreated = await prismaClient.$transaction(
      users.map(user => {
        return prismaClient.team_redmine_user.create({
          data: {
            redmine_user_import_id: user.id,
            team_id,
          },
        });
      }),
    );

    return recordToEntity(TeamRedmineUser, usersCreated);
  }
}
