import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { prismaClient } from '@shared/infra/prisma/prismaClient';
import { plainToClass } from 'class-transformer';
import User from '../entities/User';

export class UserRepository implements IUserRepository {
  public async findByName(name: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { name } });

    return user ? plainToClass(User, user) : null;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    return user ? plainToClass(User, user) : null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({ where: { email } });

    return user ? plainToClass(User, user) : null;
  }

  public async find(): Promise<IUser[]> {
    const users = await prismaClient.user.findMany();

    return plainToClass(User, users);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const userCreated = await prismaClient.user.create({
      data: { name, email, password },
    });

    return plainToClass(User, userCreated);
  }

  public async save(user: IUser): Promise<IUser> {
    const userUpdated = await prismaClient.user.update({
      where: { id: user.id },
      data: user,
    });

    return plainToClass(User, userUpdated);
  }
}
