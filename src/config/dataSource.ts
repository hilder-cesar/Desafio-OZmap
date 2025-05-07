import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { EntityMap } from '../entities/EntityMap';
import { SyncMeta } from '../entities/SyncMeta';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  username: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DB,
  entities: [EntityMap, SyncMeta],
  synchronize: true,
  logging: false
});
