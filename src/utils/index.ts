import { resolve } from 'path';
import type { PersonalData } from '../types';
import fs from 'fs';
import path from 'path';

export const formatName = (name: string) => name.split(' ').join('-');

export const formatFilename = (fileType: 'docx' | 'pdf', formattedName: string, type: 'companyCopy' | 'personal') => {
  return type === 'companyCopy' ? `${formattedName}.${fileType}` : `${formattedName}-cover-letter.${fileType}`;
};

export const resolvePathFromCurrentDir = (__dirname, path?: string) => {
  return typeof path === 'string' && path.length ? `${resolve(__dirname, '..', path || '')}/` : '';
};

export const writeJSONToDisk = async <T extends keyof PersonalData>(
  key: T,
  personalData: PersonalData[T] | { personalIntro: string },
  writePath: string
) => {
  const json = JSON.stringify(personalData);
  fs.writeFileSync(path.resolve(writePath, `${key}.json`), json);
};
