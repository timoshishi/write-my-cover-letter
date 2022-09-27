import inquirer, { Question } from 'inquirer';
import { PersonalData, Roles } from '../types';
import { readPersonalization } from '../readPersonalization';
import { updateContactInfo } from './updateContactInfo';
import { writeJSONToDisk } from '../utils';
import { updatePersonalIntro } from './updatePersonalIntro';

export const createRoleOptions = (roles: Roles): Question[] =>
  Object.keys(roles).map((role) => ({
    name: role,
    message: `Update the description for ${role}`,
    default: roles[role],
  }));

export const updateRoles = (roles) => async (): Promise<PersonalData['roles'] | void> => {
  const roleOptions = createRoleOptions(roles);
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
        ...roleOptions,
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

    const updatedRoles = { ...roles, [newRole]: newRoleDescription };
    await writeJSONToDisk('roles', updatedRoles, 'cvPersonalization');
    return updatedRoles;
  } else {
    const roleDescription = await inquirer.prompt({
      type: 'input',
      name: 'roleDescription',
      message: `What is the new description for ${responses.roles}?`,
      default: roles[responses.roles],
    });

    const updatedRoles = { ...roles, [responses.roles]: roleDescription.roleDescription };
    await writeJSONToDisk('roles', updatedRoles, 'cvPersonalization');
    return updatedRoles;
  }
};

const PERSONALIZATION_CHOICES = [
  {
    type: 'list',
    name: 'personalization',
    message: 'Select an option to personalize',
    choices: [
      { name: 'Update your contact info', value: 'contactInfo' },
      { name: 'Update personal intro', value: 'personalIntro' },
      { name: 'Update a role with some information about a project you have completed', value: 'roles' },
      { name: 'Go back to complete your cover letter', value: 'exit' },
    ],
  },
];

export const updatePersonalizedData = async (personalData: PersonalData) => {
  const answer = await inquirer.prompt(PERSONALIZATION_CHOICES);
  if (answer.personalization === 'exit') {
    return;
  } else {
    const fn = {
      roles: updateRoles(personalData.roles),
      personalIntro: updatePersonalIntro(personalData.personalIntro),
      contactInfo: updateContactInfo(personalData.contactInfo),
    }[answer.personalization];

    await fn();
    const updatedPersonalData = await readPersonalization();
    if (!updatedPersonalData) {
      throw new Error('Could not read personalization');
    }
    await updatePersonalizedData(updatedPersonalData);
  }
};
