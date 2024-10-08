import { linkQueue } from './queue/queue';

const startCollecting = async () => {
    const startUrl = 'https://www.doktor.ch/index.html';

    await linkQueue.add(
        'link',
        { url: startUrl, baseUrl: 'https://www.doktor.ch' },
        { jobId: startUrl }
    );
};

startCollecting();

setInterval(async () => {
    const jobCount = await linkQueue.getJobCounts();
    console.log(jobCount);
}, 15000);
