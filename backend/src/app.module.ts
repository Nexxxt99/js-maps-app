import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapObjectsModule } from './map-objects/map-objects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MapObjectEntity } from './map-objects/dao/map-object.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: config.get('DB_PORT'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                entities: [MapObjectEntity],
                namingStrategy: new SnakeNamingStrategy(),
            }),
        }),
        MapObjectsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
