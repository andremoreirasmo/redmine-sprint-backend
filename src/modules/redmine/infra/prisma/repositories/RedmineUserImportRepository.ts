import RedmineUserImport from '@modules/redmine/domain/entities/RedmineUserImport';
import { ICreateUserImportRedmine } from '@modules/redmine/domain/models/ICreateUserImportRedmine';
import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import { IRedmineUserImportRepository } from '@modules/redmine/domain/repositories/IRedmineUserImportRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class RedmineUserImportRepository
  implements IRedmineUserImportRepository
{
  public async findByRedmine(id: string): Promise<IRedmineUserImport[]> {
    const users = await prismaClient.redmine_user_import.findMany({
      where: { redmine_id: id },
      orderBy: { name: 'asc' },
    });

    return recordToEntity(RedmineUserImport, users);
  }

  public async create(
    user: ICreateUserImportRedmine,
  ): Promise<IRedmineUserImport> {
    const userImport = await prismaClient.redmine_user_import.create({
      data: user,
    });

    return recordToEntity(RedmineUserImport, userImport);
  }

  public async save(user: IRedmineUserImport): Promise<IRedmineUserImport> {
    const userImportUpdated = await prismaClient.redmine_user_import.update({
      where: { id: user.id },
      data: user,
    });

    return recordToEntity(RedmineUserImport, userImportUpdated);
  }
}
