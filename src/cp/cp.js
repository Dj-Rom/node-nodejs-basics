import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const child = spawn('node', [`
    process.stdin.on('data', (data) => {
      console.log(\`Received input: \${data.toString()}\`);
    });

    process.stdout.write('Child process started\\n');
  `, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error(`Failed to start child process: ${err}`);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Child process exited with code ${code}`);
    }
  });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
