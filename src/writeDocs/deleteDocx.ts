import fs from 'fs/promises';
import path from 'path';
import { formatFilename, formatName } from '../utils';

const deleteDocx = async (name: string, type: 'personal' | 'companyCopy' = 'personal', writePath: string = '') => {
  try {
    const formattedName = formatName(name);
    const enterPath = formatFilename('docx', formattedName, type);
    await fs.unlink(path.join(writePath, enterPath));
  } catch (error) {
    console.error(error);
  }
};
export default deleteDocx;
