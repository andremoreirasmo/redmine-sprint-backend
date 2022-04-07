import { ITeamRedmineUser } from '../models/ITeamRedmineUser';

class TeamRedmineUser implements ITeamRedmineUser {
  id: string;
  redmine_user_import_id: string;
  team_id: string;
}

export default TeamRedmineUser;
