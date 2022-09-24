import { generateParagraphs } from '../generateParagraphs';
import deleteDocx from './deleteDocx';
import writeDocx from './writeDocx';
import writePdf from './writePDF';
import { TextResponses, PersonalData } from '../types';

export interface WriteFilesParams {
  textResponses: TextResponses;
  outputTypes: ('docx' | 'pdf')[];
  createCopy: boolean;
  personalData: PersonalData;
}

export const writeFiles = async (
  { textResponses, outputTypes, createCopy, personalData }: WriteFilesParams,
  testPath?: string
) => {
  const cvText = generateParagraphs({ textResponses, personalData });

  try {
    await writeDocx({ createCopy, cvText, personalData, company: textResponses.company }, testPath);

    if (outputTypes.includes('pdf')) {
      await writePdf(
        {
          name: personalData.contactInfo.name,
          company: textResponses.company,
          createCopy: createCopy,
        },
        testPath
      );
    }
    if (!outputTypes.includes('docx')) {
      deleteDocx(personalData.contactInfo.name, testPath);
    }
  } catch (err) {
    console.error(err);
  }
};
