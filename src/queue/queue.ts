import { Queue } from 'bullmq';
import 'dotenv/config';
import { redis } from '../config/redis.js';

export const linkQueue = new Queue('link', {
    connection: redis,
});
