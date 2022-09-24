import libre from 'libreoffice-convert';
import fs from 'fs';
import { formatFilename, formatName, resolvePathFromCurrentDir } from '../utils';

const writePDF = (
  {
    name,
    company,
    createCopy,
  }: {
    name: string;
    company: string;
    createCopy: boolean;
  },
  path = ''
) => {
  return new Promise((resolve, reject) => {
    const formattedCompany = formatFilename('pdf', formatName(company), 'companyCopy');
    const formattedName = formatFilename('pdf', formatName(name), 'personal');
    const docxCopyName = formatFilename('docx', formatName(name), 'personal');
    const extend = '.pdf';
    const WRITE_PATH = resolvePathFromCurrentDir(__dirname, path);

    const file = fs.readFileSync(WRITE_PATH + docxCopyName);

    libre.convert(file, extend, undefined, (err: Error | null, done: Buffer) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        reject(err);
      }
      fs.writeFileSync(WRITE_PATH + formattedName, done);
      if (createCopy) {
        fs.writeFileSync(WRITE_PATH + formattedCompany, done);
      }
      // for unit testing
      resolve('pdf written');
    });
  });
};

export default writePDF;
