import { ITeamActivity } from '../models/ITeamActivity';

class TeamActivity implements ITeamActivity {
  id: string;

  name: string;

  team_id: string;

  createdAt: Date;

  updatedAt: Date;
}

export default TeamActivity;
