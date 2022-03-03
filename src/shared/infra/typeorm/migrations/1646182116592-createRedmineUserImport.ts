import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRedmineUserImport1646182116592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'redmine_user_import',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'redmine_id',
            type: 'uuid',
          },
          {
            name: 'id_user_redmine',
            type: 'integer',
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
            name: 'fk_redmine_user_import_redmine',
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
    await queryRunner.dropTable('redmine_user_import');
  }
}
