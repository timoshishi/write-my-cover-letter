import { PersonalData } from './types';
declare const readPersonalization: (filePath?: string[]) => Promise<PersonalData | undefined>;
export default readPersonalization;
