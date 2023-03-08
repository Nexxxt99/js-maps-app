import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const { env } = process;

const options: DataSourceOptions = {
    type: 'postgres',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['./dist/*/dao/*'],
    migrations: env.SKIP_MIGRATIONS === '1' ? [] : ['**/dao/migrations/*.ts'],
};

export default new DataSource(options);
