import * as defaultPersonalData from '../__mocks__/tsDefaultPersonalization';
import * as emptyPersonalData from '../__mocks__/tsPersonalization';
import { applyDefaultPersonalizationData } from '../src/applyDefaultPersonalData';

describe('applyDefaultPersonalizationData', () => {
  test('it should return the defaultPersonalizationData if no personalData is found', async () => {
    const result = await applyDefaultPersonalizationData(defaultPersonalData, emptyPersonalData);
    expect(result).toEqual(defaultPersonalData);
  });

  test('it should only overwrite falsy values in the personalized object', () => {
    const result2 = applyDefaultPersonalizationData(defaultPersonalData, {
      contactInfo: {
        email: '',
        name: 'myName',
        phone: 'myPhone',
        sites: [],
      },
      personalIntro: 'myIntro',
      roles: {
        backend: 'yes',
        frontend: 'yes',
        fullstack: 'yes',
      },
    });
    expect(result2.contactInfo.email).toEqual(defaultPersonalData.contactInfo.email);
    expect(result2.contactInfo.name).toEqual('myName');
  });

  it('should apply the personal array only', () => {
    const result3 = applyDefaultPersonalizationData(defaultPersonalData, {
      contactInfo: {
        email: '',
        name: 'myName',
        phone: 'myPhone',
        sites: ['mysitasdfe'],
      },
      personalIntro: 'myIntro',
      roles: {
        backend: 'yes',
        frontend: 'yes',
        fullstack: 'yes',
      },
    });
    expect(result3.contactInfo.sites).toEqual(['mysitasdfe']);
    expect(result3.contactInfo.email).toEqual(defaultPersonalData.contactInfo.email);
    expect(result3.contactInfo.name).toEqual('myName');
  });
});
