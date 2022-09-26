import { PersonalData } from './types';
export declare const readPersonalization: (filePath?: string[]) => Promise<PersonalData | void>;
export declare const readDefaultPersonalization: (filePath?: string[]) => Promise<PersonalData | undefined>;
