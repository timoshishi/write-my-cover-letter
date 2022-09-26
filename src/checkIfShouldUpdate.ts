import { ListQuestion } from 'inquirer';

export const checkIfShouldUpdate = (hasPersonalData: boolean): ListQuestion => {
  if (!hasPersonalData) {
    console.log("Hey, you haven't filled out your personal data yet!");
  }
  return {
    type: 'list',
    name: 'shouldUpdate',
    message: 'You can update your personal information! What would you like to do?',
    choices: [
      { name: 'Update my personal data', value: true, short: 'Update' },
      { name: "Fill in what I don't have with the defaults", value: false, short: 'Skip' },
    ],
  };
};
