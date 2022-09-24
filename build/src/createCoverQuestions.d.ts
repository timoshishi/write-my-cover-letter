import { PersonalData } from './types';
export declare const createCoverQuestions: (personalData: PersonalData) => ({
    type: string;
    name: string;
    message: string;
    choices?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    choices: string[];
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
        checked: boolean;
    }[];
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    default: boolean;
    choices?: undefined;
})[];
