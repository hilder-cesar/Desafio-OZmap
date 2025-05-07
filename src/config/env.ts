import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT ?? 3000),

  ISP_API: process.env.ISP_API!,
  OZMAP_API: process.env.OZMAP_API!,
  OZMAP_TOKEN: process.env.OZMAP_TOKEN!,

  MYSQL_HOST: process.env.MYSQL_HOST ?? 'localhost',
  MYSQL_PORT: Number(process.env.MYSQL_PORT ?? 3306),
  MYSQL_USER: process.env.MYSQL_USER ?? 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? 'root',
  MYSQL_DB: process.env.MYSQL_DB ?? 'ozmapsync',

  REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',

  SYNC_CRON: process.env.SYNC_CRON ?? '*/5 * * * *'
};
