import inquirer from 'inquirer';

export const checkIfShouldUpdate = async (): Promise<boolean> => {
  const { shouldUpdate } = await inquirer.prompt({
    type: 'list',
    name: 'shouldUpdate',
    message: 'You can update your personal information! What would you like to do?',
    choices: [
      { name: 'Use defaults', value: false, short: 'Skip' },
      { name: 'Update my personal data', value: true, short: 'Update' },
    ],
  });
  return shouldUpdate;
};
