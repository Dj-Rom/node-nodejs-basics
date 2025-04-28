import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const results = [];
  let counter = 10;

  const workers = Array.from({ length: numCPUs }, (_, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(path.resolve(__dirname, 'worker.js'));

      worker.on('message', (result) => {
        results.push(result);
        resolve();
      });

      worker.on('error', () => {
        results.push({ status: 'error', data: null });
        resolve();
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          results.push({ status: 'error', data: null });
          resolve();
        }
      });

      worker.postMessage(counter + index);
    });
  });

  await Promise.all(workers);
  
  console.log('Results:', results);
};

await performCalculations();
