import { PersonalData } from './types';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

export const readPersonalization = async (filePath?: string[]) => {
  const completePath = filePath
    ? path.resolve(...filePath, 'cvPersonalization')
    : path.resolve(__dirname, '..', 'cvPersonalization');

  try {
    const fileNames = await readdir(completePath);
    const personalData = {} as unknown as PersonalData;
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const fileData = await readFile(path.join(completePath, fileName), 'utf8');
      const objectName = fileName.split('.')[0];
      personalData[objectName] = JSON.parse(fileData);
    }
    return personalData;
  } catch (error) {
    console.error(error);
  }
};
