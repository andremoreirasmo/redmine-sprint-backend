import { ITeamTaskCategory } from '../../../domain/models/ITeamTaskCategory';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('team_task_category')
class TeamTaskCategory implements ITeamTaskCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  team_id: string;

  @Column('boolean')
  productive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default TeamTaskCategory;
