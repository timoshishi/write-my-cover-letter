import { DefaultStyles, Options } from '../types';
declare const writeDocx: (options: Options & {
    defaultStyles: DefaultStyles;
    contactInfo: string;
    roleStr: string;
    aboutMe: string;
    closer: string;
    introPara: string;
    toWhomItMayConcern: string;
    name: string;
}, path?: string) => Promise<unknown>;
export default writeDocx;
