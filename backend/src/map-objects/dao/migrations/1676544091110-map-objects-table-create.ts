import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { MAP_OBJECT_TABLE } from '../map-object.entity';

const sqlScript = `DROP TABLE IF EXISTS ${MAP_OBJECT_TABLE};
CREATE TABLE ${MAP_OBJECT_TABLE}(
    id uuid not null default uuid_generate_v4(),
    coords varchar not null,
    info varchar not null,
    created_at timestamp not null default now(),
    created_by uuid,
    updated_at timestamp default now(),
    updated_by uuid
)
`;

export class MapObjectsTableCreate1676544091110 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(sqlScript);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
