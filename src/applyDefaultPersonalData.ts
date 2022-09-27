import { PersonalData } from './types';

export const applyDefaultPersonalizationData = (
  personalData: PersonalData,
  defaultPersonalData: PersonalData
): PersonalData => {
  const appliedDefaults = {
    contactInfo: {
      email: personalData.contactInfo.email || defaultPersonalData.contactInfo.email,
      phone: personalData.contactInfo.phone || defaultPersonalData.contactInfo.phone,
      name: personalData.contactInfo.name || defaultPersonalData.contactInfo.name,
      sites: personalData.contactInfo.sites || defaultPersonalData.contactInfo.sites,
    },
    personalIntro: personalData.personalIntro || defaultPersonalData.personalIntro,
    roles: Object.keys(personalData.roles).length ? personalData.roles : defaultPersonalData.roles,
  };
  return appliedDefaults;
};
