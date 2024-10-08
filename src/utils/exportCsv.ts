import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getEmails } from './saveEmail';

const __dirname = dirname(fileURLToPath(import.meta.url));

const exportPath = path.join(__dirname, '..', '..', 'emails.csv');

const exportCsv = async () => {
    const emails = await getEmails();
    const header = 'email';
    const csv = [header, ...emails].join('\n');
    await fs.writeFile(exportPath, csv);
    console.log(`Emails exported to ${exportPath}`);
};

exportCsv();
