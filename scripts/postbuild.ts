import { writeFileSync } from 'fs';
import { createHeader } from './createHeader';
import path from 'path';

const writeHeaderToFile = async (writePath: string[], header: string) => {
  writeFileSync(path.resolve(...writePath), header);
};

(async () => {
  try {
    const header = await createHeader();
    await writeHeaderToFile([__dirname, '..', 'build', 'header.txt'], header);
  } catch (error) {
    console.error(error);
  }
})();
