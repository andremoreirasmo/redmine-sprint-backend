import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineUser } from '@modules/redmine/domain/models/IRedmineUser';
import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { Expose } from 'class-transformer';

class Redmine implements IRedmine {
  id: string;

  name: string;

  url: string;

  @Expose({ groups: ['owner', 'admin'] })
  apiKey: string;

  project_import: number;

  createdAt: Date;

  updatedAt: Date;

  @Expose({ groups: ['owner', 'admin'] })
  redmine_users: IRedmineUser[];

  redmine_users_import: IRedmineUserImport[];

  teams: ITeam[];

  constructor(partial: Partial<Redmine>) {
    Object.assign(this, partial);
  }
}

const createEntityUser = (partial: Partial<Redmine> | null): Redmine | null => {
  if (!partial) {
    return null;
  }

  return new Redmine(partial);
};

const createEntitiesRedmines = (users: Partial<Redmine>[]): Redmine[] => {
  return users.map(user => new User(user));
};

export { createEntityRedmine, createEntitiesRedmines };
export type { Redmine };
