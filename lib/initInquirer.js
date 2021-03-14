const inquirer = require('inquirer');
const writeFiles = require('./writeDocs');

const questions = [
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
    choices: ['fullstack', 'frontend', 'backend'],
  },
  {
    type: 'list',
    name: 'industry',
    message: 'Enter the industry the company operates in',
    choices: [
      'generic',
      'socialMedia',
      'inclusive',
      'consulting',
      'openSource',
      'productivity',
      'social',
      'tech',
      'foodService',
      'education',
    ],
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
    message: 'Select your types of output files',
    choices: [
      { name: 'docx', checked: true },
      { name: 'pdf', checked: false },
    ],
  },
];

const initInquirer = async () => {
  try {
    const options = await inquirer.prompt(questions);
    await writeFiles(options);
  } catch (err) {
    console.error(err);
  }
};

module.exports = initInquirer;
