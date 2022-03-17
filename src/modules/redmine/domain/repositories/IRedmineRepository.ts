import { ICreateRedmine } from '../models/ICreateRedmine';
import { IRedmine } from '../models/IRedmine';

export interface IRedmineRepository {
  findById(id: string): Promise<IRedmine | null>;
  findByUserId(user_id: string): Promise<IRedmine[]>;
  create(redmine: ICreateRedmine): Promise<IRedmine>;
  save(redmine: IRedmine): Promise<IRedmine>;
  remove(redmine: IRedmine): Promise<void>;
}
