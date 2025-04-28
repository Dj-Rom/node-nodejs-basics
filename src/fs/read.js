import { promises as fs } from 'fs';
import { join } from 'path';

const read = async () => {
  const filePath = join('files', 'fileToRead.txt');

  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

  if (!fileExists) {
    throw new Error('FS operation failed');
  }

  const content = await fs.readFile(filePath, 'utf-8');
  console.log(content);
};

await read();
