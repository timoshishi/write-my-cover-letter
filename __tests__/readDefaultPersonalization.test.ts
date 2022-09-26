import * as defaultPersonalization from '../__mocks__/tsDefaultPersonalization';
import fs from 'fs';
import path from 'path';
import { readDefaultPersonalization } from '../src/readPersonalization';

jest.spyOn(console, 'error').mockImplementation(() => {});
describe('readDefaultPersonalization', () => {
  it('It should return one object per file in defaultPersonalization', async () => {
    const fileNames = fs.readdirSync(path.resolve(__dirname, '..', '__mocks__', 'defaultPersonalization'));
    const personalData = await readDefaultPersonalization();
    expect(personalData && Object.keys(personalData).length).toEqual(fileNames.length);
  });

  it('it should have the same amount of keys in each object as those in the mocks', async () => {
    const personalData = await readDefaultPersonalization();
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(defaultPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
    }
  });

  it('each object in personal data should have as many keys as those in the mock', async () => {
    const personalData = await readDefaultPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(defaultPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.personalIntro.length).toEqual(defaultPersonalization.personalIntro.length);
      expect(personalData.contactInfo.email.length).toEqual(defaultPersonalization.contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo).length).toEqual(
        Object.keys(defaultPersonalization.contactInfo).length
      );
      expect(Object.keys(personalData.roles).length).toEqual(Object.keys(defaultPersonalization.roles).length);
    }
  });

  it('should read from the defaultPersonalization folder if the second parameter is set to false', async () => {
    const personalData = await readDefaultPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(defaultPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.personalIntro.length).toEqual(defaultPersonalization.personalIntro.length);
      expect(personalData.contactInfo.email.length).toEqual(defaultPersonalization.contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo).length).toEqual(
        Object.keys(defaultPersonalization.contactInfo).length
      );
      expect(Object.keys(personalData.roles).length).toEqual(Object.keys(defaultPersonalization.roles).length);
    }
  });

  it('should have length for all keys in all files', async () => {
    const personalData = await readDefaultPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(defaultPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.personalIntro).toHaveLength(defaultPersonalization.personalIntro.length);
      expect(personalData.contactInfo.email).toHaveLength(defaultPersonalization.contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo)).toHaveLength(
        Object.keys(defaultPersonalization.contactInfo).length
      );
      expect(Object.keys(personalData.roles)).toHaveLength(Object.keys(defaultPersonalization.roles).length);
    }
  });

  it('should handle errors', async () => {
    expect(
      await readDefaultPersonalization([__dirname, '..', '__mocks__', 'defaultPersonalization', 'personalIntro'])
    ).toBeUndefined();
  });
});
