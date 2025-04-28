import { createWriteStream } from 'fs';
import { join } from 'path';

const write = async () => {
  const filePath = join('files', 'fileToWrite.txt');
  const writableStream = createWriteStream(filePath);

  process.stdin.pipe(writableStream);

  process.stdin.on('end', () => {
    console.log('Data has been written to fileToWrite.txt');
  });
};

await write();
