import readline from 'readline';

export const createKeypressStream = (process: NodeJS.Process): string[] => {
  const keysPressed: string[] = [];
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('keypress', (str, key) => {
    keysPressed.push(key.name);
  });
  return keysPressed;
};
