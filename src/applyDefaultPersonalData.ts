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
  for (const key in personalData) {
    if (typeof personalData[key] === 'object') {
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
  // read the default data and merge it with the personalData, with the personal data taking precedence
  const mergedData = mergeObjects(personalData, defaultPersonalData);
  return mergedData;
};
