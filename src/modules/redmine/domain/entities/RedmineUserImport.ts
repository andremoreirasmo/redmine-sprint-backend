import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';

class RedmineUserImport implements IRedmineUserImport {
  id: string;
  name: string;
  redmine_id: string;
  id_user_redmine: number;
  createdAt: Date;
  updatedAt: Date;
}

export default RedmineUserImport;
