import * as emptyPersonalData from '../__mocks__/tsPersonalization';
import { DEFAULT_PERSONALIZATION } from '../src/constants';
import { applyDefaultPersonalizationData } from '../src/applyDefaultPersonalData';
import { PersonalData } from '../src/types';

describe('applyDefaultPersonalizationData', () => {
  let dPers: PersonalData;
  let pers: PersonalData;

  beforeEach(() => {
    dPers = DEFAULT_PERSONALIZATION;
    pers = {
      contactInfo: emptyPersonalData.contactInfo,
      personalIntro: emptyPersonalData.personalIntro,
      roles: emptyPersonalData.roles,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should return the defaultPersonalizationData if no personalData is found', async () => {
    const result = await applyDefaultPersonalizationData(pers, dPers);
    expect(result).toEqual(dPers);
  });

  it('it should only overwrite falsy values in the personalized object', () => {
    pers.contactInfo.name = 'myName';
    pers.contactInfo.phone = '111';
    pers.contactInfo.sites = ['mySite'];

    const result2 = applyDefaultPersonalizationData(pers, dPers);
    expect(result2.contactInfo.email).toEqual(dPers.contactInfo.email);
    expect(result2.contactInfo.name).toEqual('myName');
    expect(result2.contactInfo.phone).toEqual('111');
    expect(result2.contactInfo.sites).toEqual(['mySite']);
  });

  it('should apply the personal array only', () => {
    pers.contactInfo.sites = ['mysitasdfe'];
    const result3 = applyDefaultPersonalizationData(
      pers,

      dPers
    );

    expect(result3.contactInfo.sites).toEqual(['mysitasdfe']);
    expect(result3.contactInfo.sites).not.toEqual(dPers.contactInfo.sites);
    expect(result3.contactInfo.email).toEqual(dPers.contactInfo.email);
    expect(result3.contactInfo.name).toEqual('myName');
  });

  it('should apply defaults to the roles if there are no roles in the personalData', () => {
    pers.roles = {};
    pers.contactInfo = {
      email: 'myEmail',
      name: 'myName',
      phone: 'myPhone',
      sites: ['mysitasdfe'],
    };
    pers.personalIntro = 'myIntro';

    const result4 = applyDefaultPersonalizationData(pers, dPers);
    expect(result4.roles).toEqual(dPers.roles);
    expect(result4.contactInfo.name).not.toEqual(dPers.contactInfo.name);
  });

  it('should apply name, email and sites if they do not exists', () => {
    pers.contactInfo = {
      email: '',
      name: '',
      phone: 'myPhone',
      sites: undefined as unknown as [],
    };

    const result5 = applyDefaultPersonalizationData(pers, dPers);
    expect(result5.contactInfo.name).toEqual(dPers.contactInfo.name);
    expect(result5.contactInfo.email).toEqual(dPers.contactInfo.email);
    expect(result5.contactInfo.sites).toEqual(dPers.contactInfo.sites);
  });
});
