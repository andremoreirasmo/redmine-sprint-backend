import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeam1632065248834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'team',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'hours_per_point',
            type: 'int',
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
            name: 'TeamRedmine',
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
    await queryRunner.dropTable('team');
  }
}
