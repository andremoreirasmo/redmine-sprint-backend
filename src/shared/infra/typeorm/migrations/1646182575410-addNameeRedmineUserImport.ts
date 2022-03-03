import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addNameeRedmineUserImport1646182575410
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'redmine_user_import',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('redmine_user_import', 'name');
  }
}
