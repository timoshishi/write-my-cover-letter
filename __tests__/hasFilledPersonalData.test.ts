import { hasFilledPersonalData } from '../src/hasFilledPersonalData';
import { PersonalData } from '../src/types';
import { personalData } from '../__mocks__';

describe('hasFilledPersonalData', () => {
  test('it should return true if all personal data is filled', () => {
    expect(hasFilledPersonalData(personalData)).toEqual(true);
  });

  test('it should return false if all personal data is missing', () => {
    const missingData: PersonalData = {
      contactInfo: {
        email: '',
        name: '',
        phone: '',
        sites: [],
      },
      personalIntro: '',
      roles: {
        backend: '',
        frontend: '',
        fullstack: '',
      },
    };
    expect(hasFilledPersonalData(missingData)).toEqual(false);
  });

  test('it should return false if any personalData is missing', () => {
    const missingData: PersonalData = {
      contactInfo: {
        email: 'myEmail@email.com',
        name: '',
        phone: '',
        sites: [],
      },
      personalIntro: '',
      roles: {
        backend: 'yes',
        frontend: 'yes',
        fullstack: 'yes',
      },
    };
    expect(hasFilledPersonalData(missingData)).toEqual(false);
  });

  it('should return true if only "sites" is missing', () => {
    const missingOnlySites: PersonalData = {
      contactInfo: {
        email: '123',
        name: 'myName',
        phone: '123',
        sites: [],
      },
      personalIntro: 'myIntro',
      roles: {
        backend: 'yes',
        frontend: 'yes',
        fullstack: 'yes',
      },
    };
    expect(hasFilledPersonalData(missingOnlySites)).toEqual(true);
  });

  it('should return false if only personalIntro is missing', () => {
    const missingOnlyPersonalIntro: PersonalData = {
      contactInfo: {
        email: '123',
        name: 'myName',
        phone: '123',
        sites: ['mySite'],
      },
      personalIntro: '',
      roles: {
        backend: 'yes',
        frontend: 'yes',
        fullstack: 'yes',
      },
    };
    expect(hasFilledPersonalData(missingOnlyPersonalIntro)).toEqual(false);
  });
  it('should return false if a role has a missing intro', () => {
    const missingRoleIntro: PersonalData = {
      contactInfo: {
        email: '123',
        name: 'myName',
        phone: '123',
        sites: ['mySite'],
      },
      personalIntro: 'myIntro',
      roles: {
        backend: '',
        frontend: 'yes',
        fullstack: 'yes',
      },
    };
    expect(hasFilledPersonalData(missingRoleIntro)).toEqual(false);
  });
});
