import { ICreateRedmine } from '@modules/redmine/domain/models/ICreateRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineRepository } from '@modules/redmine/domain/repositories/IRedmineRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class RedmineRepository implements IRedmineRepository {
  public async create({
    name,
    url,
    apiKey,
    project_import,
    redmine_users,
  }: ICreateRedmine): Promise<IRedmine> {
    const redmine = prismaClient.redmine.create({
      data: {
        name,
        url,
        apiKey,
        project_import,
        redmine_users: {
          createMany: {
            data: redmine_users,
          },
        },
      },
    });

    return redmine;
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

    return redmineUpdate;
  }

  public async findById(id: string): Promise<IRedmine | null> {
    const redmine = await prismaClient.redmine.findUnique({
      where: { id },
      include: {
        redmine_users: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
            id: true,
            role: true,
          },
        },
      },
    });

    return redmine;
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
          select: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
            id: true,
            role: true,
          },
        },
      },
    });

    return redmines;
  }

  public async remove(redmine: IRedmine): Promise<void> {
    await prismaClient.redmine.delete({ where: { id: redmine.id } });
  }
}
