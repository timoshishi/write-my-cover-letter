import inquirer from 'inquirer';

export const checkIfShouldUpdate = async (): Promise<boolean> => {
  const { shouldUpdate } = await inquirer.prompt({
    type: 'list',
    name: 'shouldUpdate',
    message: 'You can update your personal information! What would you like to do?',
    choices: [
      { name: 'Use defaults for any information I have not already provided', value: false, short: 'Use defaults' },
      { name: 'Update my personal data', value: true, short: 'Update' },
    ],
  });
  return shouldUpdate;
};
