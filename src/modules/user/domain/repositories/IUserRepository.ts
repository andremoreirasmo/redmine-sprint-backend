import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  find(): Promise<IUser[]>;
  create(data: ICreateUser): Promise<IUser>;
  save(redmine: IUser): Promise<IUser>;
}
