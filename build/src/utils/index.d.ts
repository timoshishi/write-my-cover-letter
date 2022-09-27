import type { PersonalData } from '../types';
export declare const formatName: (name: string) => string;
export declare const formatFilename: (fileType: 'docx' | 'pdf', formattedName: string, type: 'companyCopy' | 'personal') => string;
export declare const resolvePathFromCurrentDir: (__dirname: any, path?: string) => string;
export declare const writeJSONToDisk: <T extends keyof PersonalData>(key: T, personalData: PersonalData[T] | {
    personalIntro: string;
}, writePath: string) => Promise<void>;
