import { createReadStream } from 'fs';
import { join } from 'path';

const read = async () => {
  const filePath = join('files', 'fileToRead.txt');
  const stream = createReadStream(filePath);

  await new Promise((resolve, reject) => {
    stream.pipe(process.stdout);
    stream.on('end', resolve);
    stream.on('error', () => reject(new Error('FS operation failed')));
  });
};

await read();
