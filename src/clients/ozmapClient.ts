import axios from 'axios';
import { env } from '../config/env';
import { limiter } from '../utils/rateLimiter';
import { attachRetry } from '../utils/retry';

const raw = axios.create({
  baseURL: env.OZMAP_API,
  headers: {
    Authorization: `Bearer ${env.OZMAP_TOKEN}`,
    'Content-Type': 'application/json'
  },
  timeout: 10_000
});
attachRetry(raw);


function post<T>(path: string, payload: any) {
  return limiter.schedule(() => raw.post<T>(path, payload));
}

export const ozmapClient = {
  upsertCable: (body) => post('/cables:upsert', body),
  upsertBox: (body) => post('/boxes:upsert', body),
  upsertDrop: (body) => post('/drops:upsert', body),
  upsertCustomer: (body) => post('/customers:upsert', body)
};