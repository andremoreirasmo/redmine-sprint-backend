import { ITeamTaskCategory } from '../models/ITeamTaskCategory';

class TeamTaskCategory implements ITeamTaskCategory {
  id: string;

  name: string;

  team_id: string;

  productive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export default TeamTaskCategory;
