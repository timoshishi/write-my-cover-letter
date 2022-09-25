import inquirer from 'inquirer';
import { applyDefaultResponses } from './applyDefaultResponses';
import { createCoverQuestions } from './createCoverQuestions';
import { createHeader } from './createHeader';
import { readPersonalization } from './readPersonalization';
import { TextResponses } from './types';
import { writeFiles } from './writeDocs/writeFiles';

const initInquirer = async () => {
  try {
    await createHeader();

    const personalData = await readPersonalization();
    if (!personalData) {
      throw new Error('No personal data found');
    }

    const coverQuestions = createCoverQuestions(personalData);

    const { outputTypes, createCopy, ...textResponses } = await inquirer.prompt(coverQuestions);
    const result: TextResponses = textResponses;
    // assign defaults to the text responses for testing purposes
    const textResponsesWithDefaults = applyDefaultResponses(result);

    await writeFiles({ textResponses: textResponsesWithDefaults, outputTypes, createCopy, personalData });
    return 'files written';
  } catch (err) {
    console.error(err);
    console.log("WE HAVE FAILED YOU! WE'RE SORRY!");
  }
};

export default initInquirer;
