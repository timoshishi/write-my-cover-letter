import { PersonalData, CVText } from '../types';
import fs from 'fs';
import { Document, IRunOptions, Packer, Paragraph, TextRun } from 'docx';
import { DEFAULT_STYLES } from '../constants';
import { formatFilename, formatName, resolvePathFromCurrentDir } from '../utils';

const doc = new Document();

const createDocxParagraph = (text: string, options: IRunOptions) => {
  return new Paragraph({
    children: [new TextRun({ text, ...options })],
  });
};

export interface WriteDocxParams {
  cvText: CVText;
  createCopy: boolean;
  personalData: PersonalData;
  company: string;
}

const writeDocx = ({ cvText, createCopy, personalData, company }: WriteDocxParams, writePath?: string) => {
  const { contactInfo, roleStr, personalIntro, closer, introPara, toWhomItMayConcern } = cvText;
  const { name } = personalData.contactInfo;

  const BASE_PATH = resolvePathFromCurrentDir(__dirname, writePath);

  const formattedName = formatFilename('docx', formatName(name), 'personal');
  const formattedCompany = formatFilename('docx', formatName(company), 'companyCopy');

  doc.addSection({
    properties: {},
    children: [
      createDocxParagraph(toWhomItMayConcern, DEFAULT_STYLES),
      createDocxParagraph(introPara, { ...DEFAULT_STYLES }),
      createDocxParagraph(personalIntro, { ...DEFAULT_STYLES, break: 1 }),
      createDocxParagraph(roleStr, { ...DEFAULT_STYLES, break: 1 }),
      createDocxParagraph(closer, { ...DEFAULT_STYLES, break: 1 }),
      createDocxParagraph('Best Wishes,', { ...DEFAULT_STYLES, break: 1 }),
      createDocxParagraph(name, DEFAULT_STYLES),
      createDocxParagraph(contactInfo, DEFAULT_STYLES),
    ],
  });

  return new Promise((resolve, reject) => {
    Packer.toBuffer(doc)
      .then((buffer: Buffer) => {
        fs.writeFileSync(`${BASE_PATH}${formattedName}`, buffer);
        if (createCopy) {
          fs.writeFileSync(`${BASE_PATH}${formattedCompany}`, buffer);
        }
        // for unit testing
        resolve(JSON.stringify(cvText));
      })
      .catch((err: unknown) => reject(err));
  });
};

export default writeDocx;
