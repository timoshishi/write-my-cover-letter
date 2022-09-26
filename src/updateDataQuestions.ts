import inquirer, { Question, QuestionCollection } from 'inquirer';
import { PersonalData, Roles } from './types';
import path from 'path';
import fs from 'fs';

export const updatePersonalIntro = (personalIntro: string) => async (): Promise<{ personalIntro: string }> => {
  const response: {
    personalIntro: string;
  } = await inquirer.prompt([
    {
      type: 'input',
      name: 'personalIntro',
      message: 'Add an intro about yourself',
      default: personalIntro,
    },
  ]);

  return { personalIntro: response.personalIntro };
};

export const createInitialRolesListQuestions = (roles: Roles): Question[] =>
  Object.keys(roles).map((role) => ({
    name: role,
    message: `Update the description for ${role}`,
    default: roles[role],
  }));

export const updateRoles = (roles) => async () => {
  const rolesQuestions = createInitialRolesListQuestions(roles);
  const initialPrompts = [
    {
      type: 'list',
      name: 'roles',
      message: 'Update an existing role or add a new one?',
      choices: [
        {
          name: 'Add a new role',
          value: 'addRole',
        },
        ...rolesQuestions,
      ],
    },
  ];
  const responses = await inquirer.prompt(initialPrompts);
  if (responses.roles === 'addRole') {
    const {
      newRole,
      newRoleDescription,
    }: {
      newRole: string;
      newRoleDescription;
    } = await inquirer.prompt([
      {
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the new role?',
      },
      {
        type: 'input',
        name: 'newRoleDescription',
        message: 'What is the description of the new role?',
      },
    ]);

    return { ...roles, [newRole]: newRoleDescription };
  } else {
    const roleDescription = await inquirer.prompt({
      type: 'input',
      name: 'roleDescription',
      message: 'What is the description of the new role?',
      default: roles[responses.roles],
    });

    const updatedRoles = { ...roles, [responses.roles]: roleDescription.roleDescription };
    console.log('updatedRoles', JSON.stringify(updatedRoles, null, 2));
    return updatedRoles;
  }
};

export const personalizationChoices = [
  {
    type: 'list',
    name: 'personalization',
    message: 'Select an option to personalize',
    choices: [
      { name: 'Update personal intro', value: 'personalIntro' },
      // { name: 'Update your contact info', value: 'contactInfo' },
      { name: 'Update a role with some information about a project you have completed', value: 'roles' },
      { name: 'Go back to complete your cover letter', value: 'exit' },
    ],
  },
];

export const createPersonalizedDataQuestions = async (personalData: PersonalData) => {
  const answer = await inquirer.prompt(personalizationChoices);
  if (answer.personalization === 'exit') {
    return;
  } else {
    const fn = {
      roles: updateRoles(personalData.roles),
      personalIntro: updatePersonalIntro(personalData.personalIntro),
    }[answer.personalization];
    const fnRes = await fn();

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

export const writeJSONToDisk = async <T extends keyof PersonalData>(
  key: T,
  personalData: PersonalData[T],
  writePath: string
) => {
  const json = JSON.stringify(personalData);
  fs.writeFileSync(path.resolve(writePath, `${key}.json`), json);
};
