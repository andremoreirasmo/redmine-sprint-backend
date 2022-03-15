import { IRedmineUserImport } from '../models/IRedmineUserImport';

export interface IRedmineUserImportRepository {
  findByRedmine(id: string): Promise<IRedmineUserImport[]>;
  create(user: Partial<IRedmineUserImport>): Promise<IRedmineUserImport>;
  save(user: IRedmineUserImport): Promise<IRedmineUserImport>;
}
