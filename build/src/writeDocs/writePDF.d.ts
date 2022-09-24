declare const writePDF: ({ name, company, createCopy, }: {
    name: string;
    company: string;
    createCopy: boolean;
}, path?: string) => Promise<unknown>;
export default writePDF;
