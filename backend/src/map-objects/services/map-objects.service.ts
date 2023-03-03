import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapObjectEntity } from '../dao/map-object.entity';
import { Repository } from 'typeorm';
import { Pagination } from '../../common/types/pagination.interface';

@Injectable()
export class MapObjectsService {
    constructor(
        @InjectRepository(MapObjectEntity)
        private readonly mapObjectsRepository: Repository<MapObjectEntity>,
    ) {}

    public async saveObject(object: Partial<MapObjectEntity>): Promise<void> {
        await this.mapObjectsRepository.save(object);
    }

    public async getObjects(pagination: Pagination = { page: 1, pageSize: 10 }): Promise<MapObjectEntity[]> {
        const { page, pageSize } = pagination;
        const take = pageSize;
        const skip = (page - 1) * take;

        return this.mapObjectsRepository.find();
    }
}
