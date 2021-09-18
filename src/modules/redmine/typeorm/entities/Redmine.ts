import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('redmine')
class Redmine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  apiKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn('updatedAt')
  updatedAt: Date;
}

export default Redmine;
