import { AppDataSource } from './config/dataSource';
import { logger } from './config/logger';
import { queueSync } from './jobs/syncJob';
import { env } from './config/env';

async function bootstrap() {
  await AppDataSource.initialize();
  logger.info('MySQL connected');

  await queueSync();
  logger.info(`Sync job scheduled (cron: ${env.SYNC_CRON})`);
}

bootstrap().catch(err => {
  logger.error(err);
  process.exit(1);
});
