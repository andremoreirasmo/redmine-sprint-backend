import Team from '@modules/team/domain/entities/ITeam';
import { ICreateTeam } from '@modules/team/domain/models/ICreateTeam';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { ITeamRepository } from '@modules/team/domain/repositories/ITeamRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class TeamRepository implements ITeamRepository {
  public async create({
    name,
    redmine_id,
    hours_per_point,
  }: ICreateTeam): Promise<ITeam> {
    const teamCreate = await prismaClient.team.create({
      data: {
        name,
        redmine_id,
        hours_per_point,
      },
    });

    return recordToEntity(Team, teamCreate);
  }

  public async save({
    id,
    name,
    hours_per_point,
    redmine_id,
  }: ITeam): Promise<ITeam> {
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

    return recordToEntity(Team, teamSaved);
  }

  public async findByRedmineId(redmine_id: string): Promise<ITeam[]> {
    const teams = await prismaClient.team.findMany({
      where: {
        redmine_id,
      },
      include: {
        activities: {
          include: {
            activities_redmine: true,
          },
        },
        categories: {
          include: {
            categories_redmine: true,
          },
        },
      },
    });

    return recordToEntity(Team, teams);
  }
}
