import EnumRoleRedmine, {
  GetLabelsEnumRoleRedmine,
} from '@modules/redmine/domain/enums/EnumRoleRedmine';
import { IRedmine } from '@modules/redmine/domain/models/IRedmine';
import { IRedmineUser } from '@modules/redmine/domain/models/IRedmineUser';
import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import { ITeam } from '@modules/team/domain/models/ITeam';
import { Expose } from 'class-transformer';

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
  redmine_users: IRedmineUser[];

  redmine_users_import: IRedmineUserImport[];

  teams: ITeam[];
}

export default Redmine;
