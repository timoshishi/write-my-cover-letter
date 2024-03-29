import inquirer from 'inquirer';
import { PersonalData } from '../types';
import { readPersonalization } from '../readPersonalization';
import { updateContactInfo } from './updateContactInfo';
import { updatePersonalIntro } from './updatePersonalIntro';
import { updateRoles } from './updateRoles';

const PERSONALIZATION_CHOICES = [
  {
    type: 'list',
    name: 'personalization',
    message: 'Select an option to personalize',
    choices: [
      { name: 'Go back', value: 'exit' },
      { name: 'Update your contact info', value: 'contactInfo' },
      { name: 'Update your personal introduction', value: 'personalIntro' },
      {
        name: 'Write a boilerplate description for a position',
        value: 'roles',
      },
    ],
  },
];

export const updatePersonalizedData = async (personalData: PersonalData): Promise<PersonalData | void> => {
  try {
    const answer: {
      personalization: keyof PersonalData | 'exit';
    } = await inquirer.prompt(PERSONALIZATION_CHOICES);

    if (answer.personalization === 'exit') {
      return personalData;
    } else {
      /* get the function from the map using the PersonalData key from the answer */
      const updateDataFn = {
        roles: updateRoles,
        personalIntro: updatePersonalIntro,
        contactInfo: updateContactInfo,
      }[answer.personalization];

      /* invoke the function using the personalData passed in */
      await updateDataFn(personalData[answer.personalization as string]);

      /* read the personalization data from disk */
      const updatedPersonalData = await readPersonalization();
      if (!updatedPersonalData) {
        throw new Error('Could not read personalization');
      }

      /* recursively call this function with the updated personalData */
      return await updatePersonalizedData(updatedPersonalData);
    }
  } catch (error) {
    console.error(error);
  }
};
