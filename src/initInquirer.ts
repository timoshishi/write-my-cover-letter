import inquirer from 'inquirer';
import { createCoverQuestions } from './createCoverQuestions';
import { createHeader } from './createHeader';
import readPersonalization from './readPersonalization';
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
    await writeFiles({ textResponses, outputTypes, createCopy, personalData });
  } catch (err) {
    console.error(err);
  }
};

export default initInquirer;
