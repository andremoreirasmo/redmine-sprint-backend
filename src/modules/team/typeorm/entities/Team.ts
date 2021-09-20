import Redmine from '@modules/redmine/typeorm/entities/Redmine';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('team')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Redmine)
  @JoinColumn({ name: 'redmine_id' })
  redmine: Redmine;

  @Column('int')
  hours_per_point: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default Team;
