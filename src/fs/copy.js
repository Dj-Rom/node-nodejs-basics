import { promises as fs } from 'fs';
import { join } from 'path';

const copy = async () => {
  const source = join('files');
  const destination = join('files_copy');

  const sourceExists = await fs.access(source).then(() => true).catch(() => false);
  const destinationExists = await fs.access(destination).then(() => true).catch(() => false);

  if (!sourceExists || destinationExists) {
    throw new Error('FS operation failed');
  }

  await fs.cp(source, destination, { recursive: true });
};

await copy();
