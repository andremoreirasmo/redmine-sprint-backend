import { ITeamActivityRedmine } from '../../../domain/models/ITeamActivityRedmine';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_activity_redmine')
class TeamActivityRedmine implements ITeamActivityRedmine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  redmine_activity_id: number;

  @Column('uuid')
  teamActivity_id: string;
}

export default TeamActivityRedmine;
