import { PersonalData, CVText } from '../types';
export interface WriteDocxParams {
    cvText: CVText;
    createCopy: boolean;
    personalData: PersonalData;
    company: string;
}
declare const writeDocx: ({ cvText, createCopy, personalData, company }: WriteDocxParams, writePath?: string) => Promise<unknown>;
export default writeDocx;
