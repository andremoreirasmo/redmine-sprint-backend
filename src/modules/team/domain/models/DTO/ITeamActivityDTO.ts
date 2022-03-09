import { ITeamActivity } from '../ITeamActivity';
import { ITeamActivityRedmine } from '../ITeamActivityRedmine';

export interface ITeamActivityDTO extends ITeamActivity {
  redmine_activities: ITeamActivityRedmine[];
}
