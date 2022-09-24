import { DefaultStyles, Options, PersonalData } from '../types';
import fs from 'fs';
import { Document, IRunOptions, Packer, Paragraph, TextRun } from 'docx';
import { DEFAULT_STYLES } from '../../src/constants';
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

const writeDocx = ({ cvText, createCopy, personalData, company }: WriteDocxParams, testPath?: string) => {
  const { contactInfo, roleStr, aboutMe, closer, introPara, toWhomItMayConcern } = cvText;
  const { name } = personalData.contactInfo;

  const BASE_PATH = `${testPath?.length ? `${testPath}/` : ''}`;
  const formattedName = `${name.split(' ').join('_')}_cover_letter.docx`;
  const formattedCompany = `${company.split(' ').join('_')}.docx`;
  doc.addSection({
    properties: {},
    children: [
      createDocxParagraph(toWhomItMayConcern, DEFAULT_STYLES),
      createDocxParagraph(introPara, { ...DEFAULT_STYLES }),
      createDocxParagraph(aboutMe, { ...DEFAULT_STYLES, break: 1 }),
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
