import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnProjectImportRedmine1639438915334
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'redmine',
      new TableColumn({
        name: 'project_import',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('redmine', 'project_import');
  }
}
