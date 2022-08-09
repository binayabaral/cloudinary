import fs from 'fs';

/**
 * Write to a file.
 * @param {string} filename
 * @param {object} content
 */
export const writeDataToFile = (filename: string, content: object) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
};
