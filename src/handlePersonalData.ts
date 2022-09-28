import inquirer from 'inquirer';
import { readPersonalization } from './readPersonalization';
import { checkIfShouldUpdate } from './checkIfShouldUpdate';
import { updatePersonalizedData } from './updateData/updateDataQuestions';
import { applyDefaultPersonalizationData } from './applyDefaultPersonalData';
import type { PersonalData } from './types';
import { DEFAULT_PERSONALIZATION } from './constants';

export const handlePersonalData = async (): Promise<PersonalData> => {
  const personalData = await readPersonalization();
  if (!personalData) throw new Error('No personal data found');

  const defaultPersonalizationData = DEFAULT_PERSONALIZATION;
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
