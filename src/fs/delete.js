import { promises as fs } from 'fs';
import { join } from 'path';

const remove = async () => {
  const filePath = join('files', 'fileToRemove.txt');

  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

  if (!fileExists) {
    throw new Error('FS operation failed');
  }

  await fs.unlink(filePath);
};

await remove();
