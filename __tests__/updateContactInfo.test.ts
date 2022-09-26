import inquirer from 'inquirer';
import { addOrDeleteSites, updateContactInfo } from '../src/updateData/updateContactInfo';
beforeAll(() => {
  jest.spyOn(require('../src/updateData/updateDataQuestions'), 'writeJSONToDisk').mockImplementation(() => {});
});
describe('addOrDeleteSites', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(inquirer, 'prompt');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array with a new site if none are passed in and one is added', async () => {
    spy
      .mockResolvedValueOnce({ addOrDelete: 'add' })
      .mockResolvedValueOnce({ newSite: 'www.google.com' })
      .mockResolvedValueOnce({ shouldContinue: false });
    const returnedSites = await addOrDeleteSites([]);
    expect(returnedSites).toEqual(['www.google.com']);
  });

  it('should return two sites if one is passed in and one is added', async () => {
    spy
      .mockResolvedValueOnce({ addOrDelete: 'add' })
      .mockResolvedValueOnce({ newSite: 'www.google.com' })
      .mockResolvedValueOnce({ shouldContinue: false });
    const returnedSites = await addOrDeleteSites(['www.facebook.com']);
    expect(returnedSites).toEqual(['www.facebook.com', 'www.google.com']);
  });

  it('should return an empty array if one site is passed in and the site is deleted', async () => {
    spy
      .mockResolvedValueOnce({ addOrDelete: 'delete' })
      .mockResolvedValueOnce({ sitesToDelete: ['www.facebook.com'] })
      .mockResolvedValueOnce({ shouldContinue: false });
    const returnedSites = await addOrDeleteSites(['www.facebook.com']);
    expect(returnedSites).toEqual([]);
  });

  it('should return a single site if two sites are passed in and one is deleted', async () => {
    spy
      .mockResolvedValueOnce({ addOrDelete: 'delete' })
      .mockResolvedValueOnce({ sitesToDelete: ['www.facebook.com'] })
      .mockResolvedValueOnce({ shouldContinue: false });
    const returnedSites = await addOrDeleteSites(['www.facebook.com', 'www.google.com']);
    expect(returnedSites).toEqual(['www.google.com']);
  });

  it('should allow you to add a site and delete another site if you decide to continue editing', async () => {
    spy
      .mockResolvedValueOnce({ addOrDelete: 'add' })
      .mockResolvedValueOnce({ newSite: 'www.google.com' })
      .mockResolvedValueOnce({ shouldContinue: true })
      .mockResolvedValueOnce({ addOrDelete: 'delete' })
      .mockResolvedValueOnce({ sitesToDelete: ['www.facebook.com'] })
      .mockResolvedValueOnce({ shouldContinue: false });
    const returnedSites = await addOrDeleteSites(['www.facebook.com', 'www.nomore.com']);
    expect(returnedSites).toEqual(['www.nomore.com', 'www.google.com']);
  });
});

describe('updateContactInfo', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(inquirer, 'prompt');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should update name, email and phone', async () => {
    spy
      .mockResolvedValueOnce({ name: 'bob', phone: '1234567890', email: 'mersite.com' })
      .mockResolvedValueOnce({ shouldUpdateSites: false });

    const returnedContactInfo = await updateContactInfo({
      name: 'frank',
      email: 'fake.com',
      phone: '000',
      sites: ['www.google.com'],
    })();
    expect(returnedContactInfo).toEqual({
      name: 'bob',
      email: 'mersite.com',
      phone: '1234567890',
      sites: ['www.google.com'],
    });
  });

  it('should update name, email, phone and sites if you choose to update sites', async () => {
    spy
      .mockResolvedValueOnce({ name: 'bob', phone: '1234567890', email: 'mersite.com' })
      .mockResolvedValueOnce({ shouldUpdateSites: true })
      .mockResolvedValueOnce({ addOrDelete: 'add' })
      .mockResolvedValueOnce({ newSite: 'www.FAKE.com' })
      .mockResolvedValueOnce({ shouldContinue: false });

    const returnedContactInfo = await updateContactInfo({
      name: 'frank',
      email: 'fake.com',
      phone: '000',
      sites: ['www.google.com'],
    })();
    expect(returnedContactInfo).toEqual({
      name: 'bob',
      email: 'mersite.com',
      phone: '1234567890',
      sites: ['www.google.com', 'www.FAKE.com'],
    });
  });

  it('should be able to both add and delete sites', async () => {
    spy
      .mockResolvedValueOnce({ name: 'bob', phone: '1234567890', email: 'mersite.com' })
      .mockResolvedValueOnce({ shouldUpdateSites: true })
      .mockResolvedValueOnce({ addOrDelete: 'add' })
      .mockResolvedValueOnce({ newSite: 'www.FAKE.com' })
      .mockResolvedValueOnce({ shouldContinue: true })
      .mockResolvedValueOnce({ addOrDelete: 'delete' })
      .mockResolvedValueOnce({ sitesToDelete: ['www.google.com'] })
      .mockResolvedValueOnce({ shouldContinue: false });

    const returnedContactInfo = await updateContactInfo({
      name: 'frank',
      email: 'fake.com',
      phone: '000',
      sites: ['www.google.com'],
    })();
    expect(returnedContactInfo).toEqual({
      name: 'bob',
      email: 'mersite.com',
      phone: '1234567890',
      sites: ['www.FAKE.com'],
    });
  });
});
