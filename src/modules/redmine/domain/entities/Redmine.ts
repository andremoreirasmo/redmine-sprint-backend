import EnumRoleRedmine, {
  GetLabelsEnumRoleRedmine,
} from '@modules/redmine/domain/enums/EnumRoleRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { Expose } from 'class-transformer';
import RedmineUser from './RedmineUser';
import RedmineUserImport from './RedmineUserImport';

class Redmine implements IRedmine {
  id: string;

  name: string;

  url: string;

  @Expose({
    groups: GetLabelsEnumRoleRedmine(
      EnumRoleRedmine.Admin,
      EnumRoleRedmine.Owner,
    ),
  })
  apiKey: string;

  project_import: number;

  createdAt: Date;

  updatedAt: Date;

  @Expose({
    groups: GetLabelsEnumRoleRedmine(
      EnumRoleRedmine.Admin,
      EnumRoleRedmine.Owner,
    ),
  })
  redmine_users: RedmineUser[];

  redmine_users_import: RedmineUserImport[];

  teams: ITeam[]; //Todo: Ajustar
}

export default Redmine;
