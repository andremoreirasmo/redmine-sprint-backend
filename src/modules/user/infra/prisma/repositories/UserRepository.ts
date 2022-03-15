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
    const users = await this.ormRepository.find();

    return users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }
}
