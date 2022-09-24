import { PersonalData } from './types';
import fs from 'fs';
import path from 'path';

const readPersonalization = () => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, '..', 'cvPersonalization'));
  const personalData = {} as PersonalData;
  fileNames.forEach((fileName: string) => {
    const fileData = fs.readFileSync(path.resolve(__dirname, '..', 'cvPersonalization', fileName), 'utf8');
    const objectName: keyof PersonalData = fileName.split('.')[0] as keyof PersonalData;
    personalData[objectName] = JSON.parse(fileData);
  });
  return personalData;
};
readPersonalization();

export default readPersonalization;
