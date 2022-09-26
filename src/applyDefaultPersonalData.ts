import { PersonalData } from './types';
import { merge } from 'lodash';

const mergeTruthyValues = (personalValue: any, defaultValue: any) => {
  if (personalValue) {
    return personalValue;
  } else {
    return defaultValue;
  }
};

const mergeObjects = (personalData: PersonalData, defaultPersonalData: PersonalData) => {
  const mergedObj = {} as PersonalData;
  for (const key in defaultPersonalData) {
    if (typeof defaultPersonalData[key] === 'object') {
      mergedObj[key] = merge(personalData[key], defaultPersonalData[key]);
    } else {
      mergedObj[key] = mergeTruthyValues(personalData[key], defaultPersonalData[key]);
    }
  }
  return mergedObj;
};

export const applyDefaultPersonalizationData = (
  personalData: PersonalData,
  defaultPersonalData: PersonalData
): PersonalData => {
  const mergedData = { ...personalData } as PersonalData;

  if (!Object.keys(personalData.roles).length) {
    console.log('Adding a few roles to get you started!');
    mergedData.roles = defaultPersonalData.roles;
  }

  if (!personalData.personalIntro) {
    console.log('Adding a personal intro to get you started!');
    mergedData.personalIntro = personalData.personalIntro || defaultPersonalData.personalIntro;
  }
  const defaultContact = defaultPersonalData.contactInfo;
  const { email, phone, name } = personalData.contactInfo;
  if (!email) {
    console.log('Adding a default email to get you started!');
    mergedData.contactInfo.email = defaultContact.email;
  }
  if (!phone) {
    console.log('Adding a default phone to get you started!');
    mergedData.contactInfo.phone = defaultContact.phone;
  }
  if (!name) {
    console.log('Adding a default name to get you started!');
    mergedData.contactInfo.name = defaultContact.name;
  }

  return mergedData;
};
