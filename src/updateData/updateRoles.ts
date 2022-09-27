import inquirer from 'inquirer';
import { writeJSONToDisk } from '../utils';
import type { PersonalData, Roles } from '../types';

export const createRoleOptions = (roles: Roles): { name: string; message: string; default: string }[] =>
  Object.keys(roles).map((role) => ({
    name: role,
    message: `Update the description for ${role}`,
    default: roles[role],
  }));

export const createRole = async (): Promise<{ role: string; description: string }> => {
  const { newRole, newRoleDescription } = await inquirer.prompt([
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
  return { role: newRole, description: newRoleDescription };
};

export const updateRole = async (role: string, description: string): Promise<Roles> => {
  const { updatedDescription } = await inquirer.prompt({
    type: 'input',
    name: 'updatedDescription',
    message: `What is the new description for ${role}?`,
    default: description,
  });
  return { [role]: updatedDescription };
};

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
    const { role, description } = await createRole();
    const updatedRoles = { ...roles, [role]: description };
    await writeJSONToDisk('roles', updatedRoles, 'cvPersonalization');
    return updatedRoles;
  } else {
    const updatedRole = await updateRole(responses.roles, roles[responses.roles]);
    const updatedRoles = { ...roles, ...updatedRole };
    await writeJSONToDisk('roles', updatedRoles, 'cvPersonalization');
    return updatedRoles;
  }
};
