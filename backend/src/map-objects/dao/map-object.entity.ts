import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { randomUUID } from 'crypto';

export const MAP_OBJECT_TABLE = 'map_objects';

@Entity(MAP_OBJECT_TABLE)
export class MapObjectEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public coords: string;

    @Column()
    public info: string;

    @CreateDateColumn({ default: 'now()' })
    public createdAt: Date;

    /* @todo: make real userId when authentication will be ready*/
    @Column()
    public createdBy: string = randomUUID();

    @UpdateDateColumn({ nullable: true, default: 'now()' })
    public updatedAt: Date;

    /* @todo: make real userId when authentication will be ready*/
    @Column({ nullable: true })
    public updatedBy: string;
}
