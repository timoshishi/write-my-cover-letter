import inquirer from 'inquirer';
import { writeJSONToDisk } from '../utils';

export const updatePersonalIntro = async (personalIntro: string): Promise<{ personalIntro: string }> => {
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
  const responseObj = {
    personalIntro: response.personalIntro,
  };
  await writeJSONToDisk('personalIntro', responseObj, 'cvPersonalization');
  return responseObj;
};
