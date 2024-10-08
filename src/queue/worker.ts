import { Worker } from 'bullmq';
import 'dotenv/config';
import { handleLink } from 'src/utils/handleLink.js';
import { redis } from '../config/redis.js';

const linkWorker = new Worker(
    'link',
    async (job) => {
        await handleLink(job.data.url, job.data.baseUrl);
    },
    { connection: redis, concurrency: 100 }
);
