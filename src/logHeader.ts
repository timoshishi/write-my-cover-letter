import { readFileSync } from 'fs';
import path from 'path';

export const logHeader = () => {
  const header = readFileSync(path.resolve(__dirname, 'header.txt'), 'utf8');
  console.log(header);
};
