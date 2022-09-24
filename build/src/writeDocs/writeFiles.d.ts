import { TextResponses, PersonalData } from '../types';
export interface WriteFilesParams {
    textResponses: TextResponses;
    outputTypes: ('docx' | 'pdf')[];
    createCopy: boolean;
    personalData: PersonalData;
}
export declare const writeFiles: ({ textResponses, outputTypes, createCopy, personalData }: WriteFilesParams, writePath?: string) => Promise<void>;
