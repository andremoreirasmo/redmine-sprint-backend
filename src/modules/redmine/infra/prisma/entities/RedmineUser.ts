import { EnumRoleRedmineLabel } from '@modules/redmine/domain/enums/EnumRoleRedmine';
import User from '@modules/user/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Redmine from './Redmine';
import { IRedmineUser } from '@modules/redmine/domain/models/IRedmineUser';

@Entity('redmine_user')
class RedmineUser implements IRedmineUser {
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

  @Expose({ name: 'roleLabel' })
  public getRoleLabel(): string {
    return EnumRoleRedmineLabel.get(this.role) ?? '';
  }
}

export default RedmineUser;
