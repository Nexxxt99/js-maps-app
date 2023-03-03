import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapObjectEntity } from './dao/map-object.entity';
import { MapObjectsService } from './services/map-objects.service';
import { MapObjectsController } from './map-objects.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MapObjectEntity])],
    controllers: [MapObjectsController],
    providers: [MapObjectsService],
})
export class MapObjectsModule {}
