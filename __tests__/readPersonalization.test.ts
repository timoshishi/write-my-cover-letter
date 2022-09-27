import * as tsPersonalization from '../__mocks__/tsPersonalization';
import fs from 'fs';
import path from 'path';
import { readPersonalization } from '../src/readPersonalization';
import { personalIntro, contactInfo, roles } from '../__mocks__/tsPersonalization';
import { PersonalData } from '../src/types';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('readPersonalization', () => {
  it('It should return a key for each file read', async () => {
    const fileNames = fs.readdirSync(path.resolve(__dirname, '..', '__mocks__', 'cvPersonalization'));
    const personalData: PersonalData | void = await readPersonalization();
    expect(personalData && Object.keys(personalData).length).toEqual(fileNames.length);
    expect(typeof personalData?.personalIntro).toEqual('string');
  });

  it('it should have the same amount of keys in each object as those in the mock', async () => {
    const personalData = await readPersonalization();
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(tsPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
    }
  });

  it('each object in personal data should have as many keys as those in the mock', async () => {
    const personalData = await readPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(tsPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.personalIntro.length).toEqual(personalIntro.length);
      expect(personalData.contactInfo.email.length).toEqual(contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo).length).toEqual(Object.keys(contactInfo).length);
      expect(Object.keys(personalData.roles).length).toEqual(Object.keys(roles).length);
    }
  });

  it('should read from the defaultPersonalization folder if the second parameter is set to false', async () => {
    const personalData = await readPersonalization([__dirname, '..', '__mocks__']);
    if (personalData) {
      const personalDataKeys = Object.keys(personalData);
      const tsPersonalizationKeys = Object.keys(tsPersonalization);
      expect(personalDataKeys.length).toEqual(tsPersonalizationKeys.length);
      expect(personalData.personalIntro.length).toEqual(personalIntro.length);
      expect(personalData.contactInfo.email.length).toEqual(contactInfo.email.length);
      expect(Object.keys(personalData.contactInfo).length).toEqual(Object.keys(contactInfo).length);
      expect(Object.keys(personalData.roles).length).toEqual(Object.keys(roles).length);
    }
  });

  it('should not have any length for the key in a file on first pass', async () => {
    const personalData = await readPersonalization([__dirname, '..', '__mocks__']);
    expect(personalData?.contactInfo.email.length).toEqual(0);
    expect(personalData?.contactInfo.name.length).toEqual(0);
    expect(personalData?.contactInfo.phone.length).toEqual(0);
    expect(personalData?.contactInfo.sites.length).toEqual(0);
    expect(personalData?.personalIntro.length).toEqual(0);
  });

  it('should return undefined if there is an error', async () => {
    const personalData = await readPersonalization([__dirname, '..', '__mocks__', 'error']);
    expect(personalData).toBeUndefined();
  });
});
