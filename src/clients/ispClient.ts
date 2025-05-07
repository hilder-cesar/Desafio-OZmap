import axios from 'axios';
import { env } from '../config/env';
import { limiter } from '../utils/rateLimiter';
import { attachRetry } from '../utils/retry';

const rawIsp = axios.create({
  baseURL: env.ISP_API,
  timeout: 10_000
});

attachRetry(rawIsp);

rawIsp.interceptors.request.use(async cfg => {
  await limiter.schedule(() => Promise.resolve()); 
  return cfg;                                     
});

export const ispClient = rawIsp;