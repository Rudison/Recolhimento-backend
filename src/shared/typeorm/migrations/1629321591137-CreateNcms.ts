import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNcms1629321591137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Ncms',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true
          },
          {
            name: 'empresaId',
            type: 'int'
          },
          {
            name: 'descricao',
            type: 'varchar'
          },
          {
            name: 'numeroNcm',
            type: 'varchar'
          },
          {
            name: 'cest',
            type: 'varchar'
          },
          {
            name: 'mva',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'ncms_empresas',
            referencedTableName: 'Empresas',
            referencedColumnNames: ['id'],
            columnNames: ['empresaId']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Ncms');
  }
}
