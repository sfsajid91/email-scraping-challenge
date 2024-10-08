import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', '..', 'db', 'emails.json');

const db = new Low<{ emails: string[] }>(new JSONFile(dbPath), {
    emails: [],
});

const emailsSet = new Set<string>();

export const saveEmail = async (email: string) => {
    await db.read();
    db.data.emails.push(email);
    await db.write();
};

export const saveEmails = async (emails: string[]) => {
    await db.read();
    db.data.emails.push(...emails);
    await db.write();
};

export const saveUniqueEmails = async (emails: string[]) => {
    emails.forEach((email) => emailsSet.add(email));
    await db.read();
    if (db.data.emails.length !== emailsSet.size) {
        db.data.emails = [...emailsSet];
        await db.write();
    }
};

export const getEmails = async () => {
    await db.read();
    return db.data.emails;
};
