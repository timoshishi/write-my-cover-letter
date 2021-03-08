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
    name: 'role',
    message: 'Enter the role listed in the job description',
  },
  {
    type: 'list',
    name: 'position',
    message: 'Enter the type of position for recent project position',
    choices: ['frontend', 'backend', 'fullstack'],
  },
  {
    type: 'list',
    name: 'industry',
    message: 'Enter the industry the company operates in',
    choices: [
      'generic',
      'socialMedia',
      'inclusive',
      'openSource',
      'productivity',
      'social',
    ],
  },
  {
    type: 'input',
    name: 'intro',
    message: 'Enter a one sentence intro about your interest in the company',
  },
  {
    type: 'checkbox',
    name: 'outputTypes',
    message: 'Enter your choices of output files',
    choices: [
      { name: 'docx', checked: false },
      { name: 'pdf', checked: true },
      { name: 'txt', checked: true },
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
