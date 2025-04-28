import { promises as fs } from 'fs';
import { join } from 'path';

const list = async () => {
  const folderPath = join('files');

  const folderExists = await fs.access(folderPath).then(() => true).catch(() => false);

  if (!folderExists) {
    throw new Error('FS operation failed');
  }

  const files = await fs.readdir(folderPath);
  console.log(files);
};

await list();
