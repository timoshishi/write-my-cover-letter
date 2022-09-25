import { PersonalData } from './types';

export const hasFilledPersonalData = (personalData: PersonalData): boolean => {
  const { personalIntro, roles, contactInfo } = personalData;
  return (
    personalIntro.length > 0 &&
    Object.values(roles).every((role) => !!role) &&
    contactInfo.phone.length > 0 &&
    contactInfo.email.length > 0 &&
    contactInfo.name.length > 0
  );
};
