import { PersonalData } from './types';
import { INDUSTRIES } from './constants';

export const createCoverLetterQuestions = (personalData: PersonalData) => {
  return [
    {
      type: 'input',
      name: 'company',
      message: 'Enter the name of the company',
    },
    {
      type: 'input',
      name: 'position',
      message: 'Enter the position listed in the job description',
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the type of role you are applying for',
      choices: Object.keys(personalData.roles),
    },
    {
      type: 'list',
      name: 'industry',
      message: 'Enter the industry the company operates in',
      choices: Object.keys(INDUSTRIES),
    },
    {
      type: 'input',
      name: 'intro',
      message:
        "Enter a one sentence intro about your interest in the company (consulting doesn't require first sentence)",
    },
    {
      type: 'input',
      name: 'skills',
      message: 'Enter skills listed in description <skill>, <skill> and <skill>',
    },
    {
      type: 'checkbox',
      name: 'outputTypes',
      message: 'Select your types of output files (pdf requires libreoffice)',
      choices: [
        { name: 'docx', checked: true },
        { name: 'pdf', checked: false },
      ],
    },
    {
      type: 'confirm',
      name: 'createCopy',
      message: "Would you like to make a copy with the company's name?",
      default: true,
    },
  ];
};
