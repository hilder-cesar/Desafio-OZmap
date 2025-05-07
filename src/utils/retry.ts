import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '../config/logger';

export function attachRetry(client: AxiosInstance, retries = 3): void {
  axiosRetry(client, {
    onMaxRetryTimesExceeded: () => {
      logger.info('Max retries Exceed')
    },
    retries,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (err) =>
      axiosRetry.isNetworkOrIdempotentRequestError(err) || err.code === 'ECONNABORTED',
  });
}