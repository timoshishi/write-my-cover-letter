import type { BrainTypes } from './types';
import type { PersonalData } from './types';
import { createFooter } from './createFooter';
import { DEFAULT_PERSONALIZATION } from './constants';

export const getBrainType = ({
  usedSomeDefaultData,
  keysPressed,
}: {
  usedSomeDefaultData: boolean;
  keysPressed: string[];
}): BrainTypes => {
  const spammedReturn = keysPressed.every((key) => key === 'return');
  if (usedSomeDefaultData && spammedReturn) return 'galaxy';
  if (usedSomeDefaultData) return 'hot';
  return 'warm';
};

export type HandleCompleteParams = {
  personalDataUsed: PersonalData;
  keysPressed: string[];
};

export const handleComplete = async ({ personalDataUsed, keysPressed }: HandleCompleteParams): Promise<BrainTypes> => {
  const defaultPersonalization: PersonalData | undefined = await DEFAULT_PERSONALIZATION;
  if (!defaultPersonalization) throw new Error('No default personalization data found');

  const usedDefaultContactInfo = Object.keys(personalDataUsed.contactInfo).every((key) => {
    if (key === 'sites') return true;
    return personalDataUsed.contactInfo[key] === defaultPersonalization.contactInfo[key];
  });
  const usedDefaultPersonalIntro = personalDataUsed.personalIntro === defaultPersonalization.personalIntro;

  const usedDefaultRoles = Object.keys(personalDataUsed.roles).every(
    (key) => personalDataUsed.roles[key] === defaultPersonalization.roles[key]
  );

  const brainType = getBrainType({
    usedSomeDefaultData: usedDefaultContactInfo || usedDefaultPersonalIntro || usedDefaultRoles,
    keysPressed,
  });

  await createFooter(brainType);
  return brainType;
};
