import { PersonalData } from './types';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

export const readPersonalization = async (filePath?: string[]): Promise<PersonalData | void> => {
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
      if (objectName === 'personalIntro') {
        personalData[objectName] = JSON.parse(fileData)['personalIntro'];
      } else {
        personalData[objectName] = JSON.parse(fileData);
      }
    }
    return personalData;
  } catch (error) {
    console.error(error);
  }
};

export const readDefaultPersonalization = async (filePath?: string[]) => {
  const completePath = filePath
    ? path.resolve(...filePath, 'defaultPersonalization')
    : path.resolve(__dirname, '..', 'defaultPersonalization');

  try {
    const fileNames = await readdir(completePath);
    const personalData = {} as unknown as PersonalData;
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const fileData = await readFile(path.join(completePath, fileName), 'utf8');
      const objectName = fileName.split('.')[0];
      if (objectName === 'personalIntro') {
        personalData[objectName] = JSON.parse(fileData)['personalIntro'];
      } else {
        personalData[objectName] = JSON.parse(fileData);
      }
    }
    return personalData;
  } catch (error) {
    console.error(error);
  }
};
