import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';

export class UserRepository implements IUserRepository {
  public async findByName(name: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { name } });

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { email } });

    return user;
  }

  public async find(): Promise<IUser[]> {
    const users = await prismaClient.user.findMany();

    return users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const userCreated = prismaClient.user.create({
      data: { name, email, password },
    });

    return userCreated;
  }

  public async save(user: IUser): Promise<IUser> {
    await prismaClient.user.update({ where: { id: user.id }, data: user });

    return user;
  }
}
