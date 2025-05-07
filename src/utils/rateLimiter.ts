import Bottleneck from 'bottleneck';
export const limiter = new Bottleneck({
  minTime: 1200,   // ≈ 50 requests/min
  maxConcurrent: 1,
});