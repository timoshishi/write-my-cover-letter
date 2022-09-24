import * as tsPersonalization from '../__mocks__/tsPersonalization';
import fs from 'fs';
import path from 'path';
import { readPersonalization } from '../src/readPersonalization';
const { aboutMe, contactInfo, roles } = tsPersonalization;

describe('readPersonalization', () => {
  test('It should return one object per file in cvPersonalization', async () => {
    const fileNames = fs.readdirSync(path.resolve(__dirname, '..', '__mocks__', 'cvPersonalization'));
    const personalData = await readPersonalization();
    expect(personalData && Object.keys(personalData).length).toEqual(fileNames.length);
  });

  test('it should have the same amount of keys in each object as those in the mock', async () => {
    const personalData = await readPersonalization();
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(tsPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
    }
  });
  test('each object in personal data should have as many keys as those in the mock', async () => {
    const personalData = await readPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(tsPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.aboutMe.aboutMe.length).toEqual(aboutMe.length);
      expect(personalData.contactInfo.email.length).toEqual(contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo).length).toEqual(Object.keys(contactInfo).length);
      expect(Object.keys(personalData.roles).length).toEqual(Object.keys(roles).length);
    }
  });
});
