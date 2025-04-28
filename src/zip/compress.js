import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';

const compress = async () => {
  const inputFilePath = join('files', 'fileToCompress.txt');
  const outputFilePath = join('files', 'archive.gz');

  const inputStream = createReadStream(inputFilePath);
  const outputStream = createWriteStream(outputFilePath);
  const gzipStream = createGzip();

  inputStream.pipe(gzipStream).pipe(outputStream);

  outputStream.on('finish', () => {
    console.log('File compressed successfully to archive.gz');
  });

  outputStream.on('error', () => {
    throw new Error('FS operation failed');
  });
};

await compress();
