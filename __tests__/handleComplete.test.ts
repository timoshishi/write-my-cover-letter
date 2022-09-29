import { jest } from '@jest/globals';
// ts-
jest.unstable_mockModule('terminal-image', () => ({
  file: jest.fn(() => Promise.resolve('')),
}));
const terminalImage = import('terminal-image');
import { handleComplete, getBrainType } from '../src/handleComplete';
import * as createFooter from '../src/createFooter';
import { BrainTypes, PersonalData } from '../src/types';
import { DEFAULT_PERSONALIZATION } from '../src/constants';
import { createKeypressStream } from '../src/createKeypressStream';
import { stdin } from 'mock-stdin';

jest.spyOn(createFooter, 'createFooter').mockImplementation((type: BrainTypes) => Promise.resolve(type));

const keys = {
  up: '\x1B\x5B\x41',
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  space: '\x20',
};
// tslint:disable-next-line: no-console

// mock the entire terminal

let io;
beforeAll(() => (io = stdin()));
afterAll(() => io.restore());

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

describe('createKeypressStream', () => {
  it('should return an array', () => {
    const result = createKeypressStream(process);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toEqual(true);
  });
  it('should store the key name that was pressed', () => {
    const result = createKeypressStream(process);

    expect(result).not.toEqual(['return']);
    io.send(keys.enter);
    expect(result).toEqual(['return']);
    expect(result.length).toBe(1);
    io.send(keys.enter);
    expect(result).toEqual(['return', 'return']);
    expect(result.length).toBe(2);
    io.send(keys.space);
    expect(result).toEqual(['return', 'return', 'space']);
  });
});
