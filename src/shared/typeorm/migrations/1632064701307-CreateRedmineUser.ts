import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRedmineUser1632064701307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'redmine_user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'role',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'redmine_id',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'RedminerUserUser',
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'RedminerUserRedmine',
            referencedTableName: 'redmine',
            referencedColumnNames: ['id'],
            columnNames: ['redmine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('redmine_user');
  }
}
