/**
 *
 * @description collect all unique emails from a page Texts
 */
export const collectUniqueEmails = async (innerHtml: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = innerHtml.match(emailRegex) || [];
    return [...new Set(foundEmails)];
};
