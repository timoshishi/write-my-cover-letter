import inquirer, { Question, QuestionCollection } from 'inquirer';
import { PersonalData } from './types';

export const updatePersonalIntro = (personalIntro: string) => {
  return {
    type: 'input',
    name: 'personalIntro',
    message: 'Add an intro about yourself',
    default: personalIntro,
  };
};

export const personalizationChoices = [
  {
    type: 'list',
    name: 'personalization',
    message: 'Select an option to personalize',
    choices: [
      { name: 'Update personal intro', value: 'personalIntro' },
      { name: 'Update your contact info', value: 'contactInfo' },
      { name: 'Update a role with some information about a project you have completed', value: 'roles' },
      { name: 'Go back to complete your cover letter', value: 'exit' },
    ],
  },
];

export const createPersonalizedDataQuestions = async (personalData: PersonalData) => {
  const answer = await inquirer.prompt(personalizationChoices);
  console.log(answer);
  if (answer.personalization === 'exit') {
    return;
  } else {
    await inquirer.prompt([updatePersonalIntro(personalData.personalIntro)]);
    await createPersonalizedDataQuestions(personalData);
  }
};

export const questionLoop = async () => {
  const answer: QuestionCollection = await inquirer.prompt(personalizationChoices);
  if (answer === 'back') {
    return;
  } else {
    await questionLoop();
  }
};
