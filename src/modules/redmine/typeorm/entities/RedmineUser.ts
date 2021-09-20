import User from '@modules/user/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Redmine from './Redmine';

@Entity('redmine_user')
class RedmineUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  role: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Redmine, redmine => redmine.redmine_users)
  @JoinColumn({ name: 'redmine_id' })
  redmine: Redmine;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default RedmineUser;
