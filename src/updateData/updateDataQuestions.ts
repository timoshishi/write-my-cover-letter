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
