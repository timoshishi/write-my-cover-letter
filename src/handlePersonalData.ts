import { readPersonalization } from './readPersonalization';
import inquirer from 'inquirer';
import { checkIfShouldUpdate } from './checkIfShouldUpdate';
import { updatePersonalizedData } from './updateData/updateDataQuestions';
import { applyDefaultPersonalizationData } from './applyDefaultPersonalData';
import { readDefaultPersonalization } from './readPersonalization';
import type { PersonalData } from './types';

export const handlePersonalData = async (): Promise<PersonalData> => {
  const personalData = await readPersonalization();
  if (!personalData) throw new Error('No personal data found');

  const defaultPersonalizationData = await readDefaultPersonalization();
  if (!defaultPersonalizationData) throw new Error('No default personalization data found');

  const { shouldUpdate } = await inquirer.prompt(checkIfShouldUpdate());

  if (shouldUpdate) {
    const updatedData = await updatePersonalizedData(personalData);
    if (!updatedData) throw new Error('Could not update personal data');
    await readPersonalization();
    return applyDefaultPersonalizationData(updatedData, defaultPersonalizationData);
  }
  return applyDefaultPersonalizationData(personalData, defaultPersonalizationData);
};
