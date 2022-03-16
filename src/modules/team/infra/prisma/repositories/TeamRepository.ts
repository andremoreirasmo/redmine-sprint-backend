import { ICreateTeam } from '@modules/team/domain/models/ICreateTeam';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamRepository implements ITeamRepository {
  public async create({
    name,
    redmine_id,
    hours_per_point,
    activities,
    categories,
  }: ICreateTeam): Promise<ITeam> {
    const teamCreate = await prismaClient.team.create({
      data: {
        name,
        redmine_id,
        hours_per_point,
        activities: { createMany: { data: activities } },
      },
    });

    return teamCreate;
  }

  public async save(team: ITeam): Promise<ITeam> {
    await this.ormRepository.save(team);

    return team;
  }
}
