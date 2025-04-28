import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join } from 'path';

const decompress = async () => {
  const inputFilePath = join('files', 'archive.gz');
  const outputFilePath = join('files', 'fileToCompress.txt');

  const inputStream = createReadStream(inputFilePath);
  const outputStream = createWriteStream(outputFilePath);
  const gunzipStream = createGunzip();

  inputStream.pipe(gunzipStream).pipe(outputStream);

  outputStream.on('finish', () => {
    console.log('File decompressed successfully to fileToCompress.txt');
  });

  outputStream.on('error', () => {
    throw new Error('FS operation failed');
  });
};

await decompress();
