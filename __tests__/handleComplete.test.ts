import { handleComplete, getBrainType } from '../src/handleComplete';
import * as createFooter from '../src/createFooter';
import { PersonalData } from '../src/types';
import { DEFAULT_PERSONALIZATION } from '../src/constants';

jest.spyOn(createFooter, 'createFooter').mockResolvedValue('galaxy');

describe('handleComplete', () => {
  let defaultData;
  beforeEach(() => {
    defaultData = DEFAULT_PERSONALIZATION;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return warm if all of the personalDataUsed is different from the default data', async () => {
    const differentPersonalData: PersonalData = {
      contactInfo: {
        name: 'bob',
        email: 'franky',
        phone: '555-555-5555',
        sites: ['https://johndoe.com', 'linkedin.com'],
      },
      personalIntro: 'Not the same',
      roles: {
        'new Role': 'this is a new role',
      },
    };
    const result = await handleComplete({
      personalDataUsed: differentPersonalData,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'a'],
    });
    expect(result).toEqual('warm');
  });

  it('should return warm if the data is different and they both have empty arrays', async () => {
    const differentPersonalData: PersonalData = {
      contactInfo: {
        sites: [],
        name: 'John Doe',
        email: 'mymail.com',
        phone: '555-555-5555',
      },
      personalIntro: 'Not the same',
      roles: {
        newRole: 'totally',
      },
    };
    const result = await handleComplete({
      personalDataUsed: differentPersonalData,
      keysPressed: ['def'],
    });
    expect(result).toEqual('warm');
  });
  it('should return hot if the name passed in in is different from the default name', async () => {
    const differentPersonalData = defaultData;
    differentPersonalData.contactInfo.name = 'bob';

    const result = await handleComplete({
      personalDataUsed: differentPersonalData,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'a'],
    });
    expect(result).toEqual('hot');
  });

  it('should return hot if the data passed in is the same as the default data but not every key pressed was return', async () => {
    const copiedData = defaultData;
    const result = await handleComplete({
      personalDataUsed: copiedData,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'a'],
    });
    expect(result).toEqual('hot');
  });
  it('should return galaxy if the data passed in is the same as the default data', async () => {
    const result = await handleComplete({
      personalDataUsed: defaultData,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return'],
    });
    expect(result).toEqual('galaxy');
  });
});

describe('getBrainType', () => {
  it('should return galaxy if the data passed in is the same as the default data and every key pressed was return', () => {
    const result = getBrainType({
      usedSomeDefaultData: true,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return'],
    });
    expect(result).toEqual('galaxy');
  });

  it('should return hot if the data passed in is the same as the default data but not every key pressed was return', () => {
    const result = getBrainType({
      usedSomeDefaultData: true,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'a'],
    });
    expect(result).toEqual('hot');
  });

  it('should return warm if the data passed in is different from the default data', () => {
    const result = getBrainType({
      usedSomeDefaultData: false,
      keysPressed: ['return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'return', 'a'],
    });
    expect(result).toEqual('warm');
  });
});
