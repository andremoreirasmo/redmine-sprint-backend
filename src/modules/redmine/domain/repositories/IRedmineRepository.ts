import { ICreateRedmine } from '../models/ICreateRedmine';
import { IRedmine } from '../models/IRedmine';

export interface IRedmineRepository {
  findById(id: string): Promise<Partial<IRedmine> | null>;
  findByUserId(user_id: string): Promise<Partial<IRedmine>[]>;
  create(redmine: ICreateRedmine): Promise<Partial<IRedmine>>;
  save(redmine: IRedmine): Promise<Partial<IRedmine>>;
  remove(redmine: IRedmine): Promise<void>;
}
