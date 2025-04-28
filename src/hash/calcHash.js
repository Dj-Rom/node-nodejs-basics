import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join } from 'path';

const calculateHash = async () => {
  const filePath = join('files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  await new Promise((resolve, reject) => {
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      console.log(hash.digest('hex'));
      resolve();
    });
    stream.on('error', () => reject(new Error('FS operation failed')));
  });
};

await calculateHash();
