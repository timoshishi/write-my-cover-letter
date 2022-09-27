import inquirer from 'inquirer';
import { writeJSONToDisk } from '../utils';
import type { PersonalData, Roles } from '../types';

export const createRoleOptions = (roles: Roles): { name: string; message: string; default: string }[] =>
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
