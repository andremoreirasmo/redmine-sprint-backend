import { ITeamActivityRedmine } from '../models/ITeamActivityRedmine';

class TeamActivityRedmine implements ITeamActivityRedmine {
  id: string;

  redmine_activity_id: number;

  teamActivity_id: string;
}

export default TeamActivityRedmine;
