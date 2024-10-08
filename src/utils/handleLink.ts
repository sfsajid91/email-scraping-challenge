import { parseHTML } from 'linkedom';
import { linkQueue } from '../queue/queue';
import { collectUniqueEmails } from './collectUniqueEmail';
import { saveUniqueEmails } from './saveEmail';

let count = 0;

/**
 * @description Collects all links from a given start URL and base URL and adds them to the link queue.
 */
export const handleLink = async (startUrl: string, baseUrl: string) => {
    try {
        const response = await fetch(startUrl);
        const html = await response.text();
        const { document } = parseHTML(html);

        const emails = await collectUniqueEmails(document.body.innerHTML || '');

        if (emails.length > 0) {
            console.log(`Found ${emails.length} emails`);
            await saveUniqueEmails(emails);
        }
        count++;

        console.log(`Processed ${count} links`);

        const linkSet = new Set<string>();

        Array.from(document.querySelectorAll('a[href]'))
            .map((a) => {
                const href = a.getAttribute('href');
                if (!href) return null;
                return href.startsWith('http')
                    ? href
                    : new URL(href, baseUrl).href;
            })
            .filter((href) => href?.startsWith(baseUrl))
            .forEach((href) => linkSet.add(href!));

        const links = Array.from(linkSet);
        if (links.length > 0) {
            await linkQueue.addBulk(
                links.map((href) => ({
                    name: 'link',
                    data: { url: href, baseUrl },
                    opts: {
                        jobId: href,
                    },
                }))
            );
        }
    } catch (error) {
        console.log(error);
    }
};
