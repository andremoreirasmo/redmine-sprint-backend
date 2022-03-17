import Redmine from '@modules/redmine/domain/entities/Redmine';
import { ICreateRedmine } from '@modules/redmine/domain/models/ICreateRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class RedmineRepository implements IRedmineRepository {
  public async create({
    name,
    url,
    apiKey,
    project_import,
    redmine_users,
  }: ICreateRedmine): Promise<IRedmine> {
    const redmine_user = redmine_users[0];

    const redmine = prismaClient.redmine.create({
      data: {
        name,
        url,
        apiKey,
        project_import,
        redmine_users: {
          create: {
            role: redmine_user.role,
            user_id: redmine_user.user_id,
          },
        },
      },
    });

    return recordToEntity(Redmine, redmine);
  }

  public async save(redmine: IRedmine): Promise<IRedmine> {
    const redmineUpdate = prismaClient.redmine.update({
      where: {
        id: redmine.id,
      },
      data: {
        ...redmine,
      },
    });

    return recordToEntity(Redmine, redmineUpdate);
  }

  public async findById(id: string): Promise<IRedmine | null> {
    const redmine = await prismaClient.redmine.findUnique({
      where: { id },
      include: {
        redmine_users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return redmine ? recordToEntity(Redmine, redmine) : null;
  }

  public async findByUserId(user_id: string): Promise<IRedmine[]> {
    const redmines = await prismaClient.redmine.findMany({
      where: {
        redmine_users: {
          some: {
            user_id,
          },
        },
      },
      include: {
        redmine_users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return recordToEntity(Redmine, redmines);
  }

  public async remove(redmine: IRedmine): Promise<void> {
    await prismaClient.redmine.delete({ where: { id: redmine.id } });
  }
}
