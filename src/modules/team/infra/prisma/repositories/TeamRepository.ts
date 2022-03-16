import { ICreateTeam } from '@modules/team/domain/models/ICreateTeam';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamRepository implements ITeamRepository {
  public async create({
    name,
    redmine_id,
    hours_per_point,
  }: ICreateTeam): Promise<Partial<ITeam>> {
    const teamCreate = await prismaClient.team.create({
      data: {
        name,
        redmine_id,
        hours_per_point,
      },
    });

    return teamCreate;
  }

  public async save({
    id,
    name,
    hours_per_point,
    redmine_id,
  }: ITeam): Promise<Partial<ITeam>> {
    const teamSaved = await prismaClient.team.update({
      where: {
        id,
      },
      data: {
        name,
        hours_per_point,
        redmine_id,
      },
    });

    return teamSaved;
  }
}
