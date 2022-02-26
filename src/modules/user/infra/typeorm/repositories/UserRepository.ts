import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

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
