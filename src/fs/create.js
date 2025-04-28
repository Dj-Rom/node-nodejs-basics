import { promises as fs } from 'fs';
import { join } from 'path';

const create = async () => {
  const filePath = join('files', 'fresh.txt');
    await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
};

await create();
