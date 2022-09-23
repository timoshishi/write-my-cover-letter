import inquirer from 'inquirer';
import { createCoverQuestions } from './createCoverQuestions';
import searchJobs from './getJobURLs';
import { createHeader } from './createHeader';
import readPersonalization from './readPersonalization';
import { writeFiles } from './writeDocs/writeFiles';

const initInquirer = async () => {
  try {
    await createHeader();
    const initialQuestions = await inquirer.prompt([
      {
        type: 'list',
        name: 'initial',
        message: 'Would you like to write a cover letter or search for recent job listings?',
        choices: ['Write a cover letter', 'Search Jobs (Open recent Hacker News jobs in browser)'],
      },
    ]);
    if (initialQuestions.initial === 'Search Jobs') {
      searchJobs();
    } else {
      let personalData = readPersonalization();
      const coverQuestions = createCoverQuestions(personalData);

      const options = await inquirer.prompt(coverQuestions);
      // console.log(options);
      await writeFiles({ ...options, personalData });
    }
  } catch (err) {
    console.error(err);
  }
};

export default initInquirer;
