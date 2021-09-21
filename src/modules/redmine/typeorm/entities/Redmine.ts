import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import RedmineUser from './RedmineUser';

@Entity('redmine')
class Redmine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  @Expose({ groups: ['owner', 'admin'] })
  apiKey: string;

  @OneToMany(() => RedmineUser, redmine_user => redmine_user.redmine, {
    cascade: true,
  })
  @Expose({ groups: ['owner', 'admin'] })
  redmine_users: RedmineUser[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default Redmine;
