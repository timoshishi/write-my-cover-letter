import inquirer from 'inquirer';
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
    if (process.env.NODE_ENV !== 'production') {
      for (const key in result) {
        result[key] =
          result[key] ||
          {
            company: 'Awesome Company',
            position: 'WORKER BEE',
            industry: 'generic',
            skills: 'Skill, Skill and Skill',
            intro: "I'm interested in the company because...",
          }[key];
      }
    }

    await writeFiles({ textResponses: result, outputTypes, createCopy, personalData });
    return 'files written';
  } catch (err) {
    console.error(err);
  }
};

export default initInquirer;
