import { promises as fs } from 'fs';
import { join } from 'path';

const rename = async () => {
  const oldPath = join('files', 'wrongFilename.txt');
  const newPath = join('files', 'properFilename.md');

  const oldExists = await fs.access(oldPath).then(() => true).catch(() => false);
  const newExists = await fs.access(newPath).then(() => true).catch(() => false);

  if (!oldExists || newExists) {
    throw new Error('FS operation failed');
  }

  await fs.rename(oldPath, newPath);
};

await rename();
