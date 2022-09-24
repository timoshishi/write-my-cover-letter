declare const writePDF: ({ name, company, copy, }: {
    name: string;
    company: string;
    copy: boolean;
}, path?: string) => Promise<unknown>;
export default writePDF;
