import { ITeam } from '../ITeam';
import { ITeamActivityDTO } from './ITeamActivityDTO';
import { ITeamTaskCategoryDTO } from './ITeamTaskCategoryDTO';

export interface ITeamDTO extends ITeam {
  activities: ITeamActivityDTO[];
  categories: ITeamTaskCategoryDTO[];
}
