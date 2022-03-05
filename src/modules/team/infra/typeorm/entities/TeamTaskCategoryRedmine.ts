import { ITeamTaskCategoryRedmine } from '../../../domain/models/ITeamTaskCategoryRedmine';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_task_category_redmine')
class TeamTaskCategoryRedmine implements ITeamTaskCategoryRedmine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  team_task_category_id: string;
}

export default TeamTaskCategoryRedmine;
