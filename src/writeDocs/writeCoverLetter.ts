import { generateParagraphs } from '../generateParagraphs';
import deleteDocx from './deleteDocx';
import writeDocx from './writeDocx';
import writePdf from './writePDF';
import { TextResponses, PersonalData } from '../types';
import { resolvePathFromCurrentDir } from '../utils';

export interface WriteFilesParams {
  textResponses: TextResponses;
  outputTypes: ('docx' | 'pdf')[];
  createCopy: boolean;
  personalData: PersonalData;
}

export const writeCoverLetter = async (
  { textResponses, outputTypes, createCopy, personalData }: WriteFilesParams,
  writePath?: string
) => {
  const cvText = generateParagraphs({ textResponses, personalData });
  const WRITE_PATH = resolvePathFromCurrentDir(__dirname, writePath);

  try {
    await writeDocx({ createCopy, cvText, personalData, company: textResponses.company }, WRITE_PATH);

    if (outputTypes.includes('pdf')) {
      await writePdf(
        {
          name: personalData.contactInfo.name,
          company: textResponses.company,
          createCopy: createCopy,
        },
        writePath
      );
    }
    if (!outputTypes.includes('docx')) {
      await deleteDocx(personalData.contactInfo.name, 'personal', WRITE_PATH);
      if (createCopy) {
        await deleteDocx(textResponses.company, 'companyCopy', WRITE_PATH);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
