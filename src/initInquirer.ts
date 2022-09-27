import inquirer from 'inquirer';
import { applyDefaultResponses } from './applyDefaultResponses';
import { createCoverQuestions } from './createCoverQuestions';
import { readFileSync } from 'fs';
import path from 'path';
import { checkIfShouldUpdate } from './checkIfShouldUpdate';
import { readDefaultPersonalization, readPersonalization } from './readPersonalization';
import { PersonalData, TextResponses } from './types';
import { writeFiles } from './writeDocs/writeFiles';
import { updatePersonalizedData } from './updateData/updateDataQuestions';
import { applyDefaultPersonalizationData } from './applyDefaultPersonalData';

const initInquirer = async () => {
  try {
    const header = readFileSync(path.resolve(__dirname, 'header.txt'), 'utf8');
    console.log(header);

    let finalData: PersonalData | void;
    const personalData = await readPersonalization();

    if (!personalData) {
      throw new Error('No personal data found');
    }

    const { shouldUpdate } = await inquirer.prompt(checkIfShouldUpdate());

    if (shouldUpdate) {
      console.log('Please fill out the following questions to update your personal data');
      await updatePersonalizedData(personalData);
    }

    finalData = await readPersonalization();
    const defaultPersonalizationData = await readDefaultPersonalization();
    finalData = applyDefaultPersonalizationData(personalData, defaultPersonalizationData!);

    if (!finalData) {
      throw new Error('No personal data found');
    }

    const coverQuestions = createCoverQuestions(finalData);

    const { outputTypes, createCopy, ...textResponses } = await inquirer.prompt(coverQuestions);
    const result: TextResponses = textResponses;
    // assign defaults to the text responses for testing purposes
    const textResponsesWithDefaults = applyDefaultResponses(result);

    await writeFiles({ textResponses: textResponsesWithDefaults, outputTypes, createCopy, personalData });
    return 'files written';
  } catch (err) {
    console.error(err);
    console.log("WE HAVE FAILED YOU! WE'RE SORRY!");
    process.exit(1);
  }
};

export default initInquirer;
