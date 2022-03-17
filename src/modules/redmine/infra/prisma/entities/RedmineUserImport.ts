import { IRedmineUserImport } from '@modules/redmine/domain/models/IRedmineUserImport';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('redmine_user_import')
class RedmineUserImport implements IRedmineUserImport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('uuid', { name: 'redmine_id' })
  redmine_id: string;

  @Column('int')
  id_user_redmine: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default RedmineUserImport;
