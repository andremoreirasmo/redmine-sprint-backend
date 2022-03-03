import { ICreateUserImportRedmine } from '../models/ICreateUserImportRedmine';
import { IRedmineUserImport } from '../models/IRedmineUserImport';

export interface IRedmineUserImportRepository {
  findByRedmine(id: string): Promise<IRedmineUserImport[]>;
  create(user: ICreateUserImportRedmine): Promise<IRedmineUserImport>;
  save(user: IRedmineUserImport): Promise<IRedmineUserImport>;
}
