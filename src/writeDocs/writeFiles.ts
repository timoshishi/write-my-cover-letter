import { generateParagraphs } from '../generateParagraphs';
import deleteDocx from './deleteDocx';
import writeDocx from './writeDocx';
import writePdf from './writePDF';
import { DEFAULT_STYLES } from '../constants';
import { Options } from '../types';

export const writeFiles = async (options: Options) => {
  const paras = generateParagraphs(options);
  try {
    const withDefaultStyles = { ...paras, defaultStyles: DEFAULT_STYLES };
    await writeDocx({ ...withDefaultStyles, ...options });

    if (options.outputTypes.includes('pdf')) {
      await writePdf({
        name: paras.name,
        company: options.company,
        copy: options.copy,
      });
    }
    if (!options.outputTypes.includes('docx')) {
      deleteDocx(paras.name);
    }
    console.log('Cover Letter Written!');
  } catch (err) {
    console.error(err);
  }
};
