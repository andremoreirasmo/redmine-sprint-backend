import User from '@modules/user/domain/entities/User';
import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { recordToEntity } from '@shared/entitites/RecordToEntity';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class UserRepository implements IUserRepository {
  public async findByName(name: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { name } });

    return user ? recordToEntity(User, user) : null;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    return user ? recordToEntity(User, user) : null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { email } });

    return user ? recordToEntity(User, user) : null;
  }

  public async find(): Promise<IUser[]> {
    const users = await prismaClient.user.findMany();

    return recordToEntity(User, users);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const userCreated = await prismaClient.user.create({
      data: { name, email, password },
    });

    return recordToEntity(User, userCreated);
  }

  public async save(user: IUser): Promise<IUser> {
    const userUpdated = await prismaClient.user.update({
      where: { id: user.id },
      data: user,
    });

    return recordToEntity(User, userUpdated);
  }
}
