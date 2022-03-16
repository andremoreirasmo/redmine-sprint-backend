import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import { v4 as uuidv4 } from 'uuid';

export default class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = { id: uuidv4(), name, email, password } as IUser;

    this.users.push(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find(user => user.id === id);
    return user ?? null;
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find(user => user.name === name);
    return user ?? null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(user => user.email === email);
    return user ?? null;
  }

  public async find(): Promise<IUser[]> {
    return this.users;
  }

  public async remove(user: IUser): Promise<void> {
    return;
  }
}
