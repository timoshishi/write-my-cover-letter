import { resolve } from 'path';

export const formatName = (name: string) => name.split(' ').join('-');

export const formatFilename = (fileType: 'docx' | 'pdf', formattedName: string, type: 'companyCopy' | 'personal') => {
  return type === 'companyCopy' ? `${formattedName}.${fileType}` : `${formattedName}-cover-letter.${fileType}`;
};

export const resolvePathFromCurrentDir = (__dirname, path?: string) => {
  return typeof path === 'string' && path.length ? `${resolve(__dirname, '..', path || '')}/` : '';
};
