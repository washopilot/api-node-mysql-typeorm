require('dotenv').config();
import config from 'config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const mysqlConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>('mysqlConfig');

export const AppDataSource = new DataSource({
    ...mysqlConfig,
    type: 'mysql',
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}']
});
