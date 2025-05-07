import { Queue, Worker, RedisConnection } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../config/env';
import { runSync } from '../services/syncService';
import { logger } from '../config/logger';

const connection = new IORedis({maxRetriesPerRequest: null, path: env.REDIS_URL });
const queueName = 'sync';

const queue = new Queue(queueName, { connection });

export async function queueSync() {
  await queue.add('full-sync', {}, {
    repeat: { limit: 3 },
    removeOnComplete: true,
    removeOnFail: 100,
  });
}

new Worker(
  queueName,
  async () => {
    try {
      await runSync();
    } catch (err) {
      logger.error('sync:error', { err });
      throw err;
    }
  },
  { connection }
);