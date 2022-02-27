import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUserRepository } from '@modules/user/domain/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async find(): Promise<IUser[]> {
    return this.users;
  }

  public async remove(user: IUser): Promise<void> {
    return;
  }
}
