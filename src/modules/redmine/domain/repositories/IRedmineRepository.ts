import { ICreateRedmine } from '../models/ICreateRedmine';
import { IRedmine } from '../models/IRedmine';

export interface IRedmineRepository {
  findById(id: string): Promise<IRedmine | undefined>;
  findByUserId(user_id: string): Promise<IRedmine[]>;
  create(data: ICreateRedmine): Promise<IRedmine>;
  save(redmine: IRedmine): Promise<IRedmine>;
  remove(redmine: IRedmine): Promise<void>;
}