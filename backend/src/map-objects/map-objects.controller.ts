import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapObjectsService } from './services/map-objects.service';
import { MapObjectEntity } from './dao/map-object.entity';
import { Pagination } from '../common/types/pagination.interface';


@Controller()
export class MapObjectsController {
    constructor(private readonly service: MapObjectsService) {}

    @Post('/getObjects')
    public async getObjects(@Body() pagination: Pagination): Promise<MapObjectEntity[]> {
        return this.service.getObjects(pagination);
    }

    @Get('/getObjects')
    public async getAllObjects(): Promise<MapObjectEntity[]> {
        return this.service.getObjects();
    }

    @Post('/saveObject')
    public async saveObject(@Body() object: Partial<MapObjectEntity>): Promise<string> {
        await this.service.saveObject(object);
        return 'ok';
    }
}
