import { updatePersonalizedData } from '../src/updateData/updateDataQuestions';
import inquirer from 'inquirer';
import { PersonalData } from '../src/types';

describe('updateData', () => {
  let inquirerSpy: jest.SpyInstance;
  let writeSpy: jest.SpyInstance;
  beforeEach(() => {
    inquirerSpy = jest.spyOn(inquirer, 'prompt');
    writeSpy = jest.spyOn(require('../src/utils'), 'writeJSONToDisk').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the original data is exit is selected as the first option', async () => {
    const originalData: PersonalData = {
      contactInfo: {
        name: 'John Doe',
        email: 'myemail@email.com',
        phone: '1234567890',
        sites: [],
      },
      personalIntro: 'I am a developer',
      roles: {
        role1: 'description1',
        role2: 'description2',
      },
    };
    inquirerSpy.mockResolvedValueOnce({ personalization: 'exit' });
    const updatedData = await updatePersonalizedData(originalData);
    expect(updatedData).toEqual(originalData);
  });

  it('should call the updateContactInfo function with the originalData.contactInfo if contactInfo is selected', async () => {
    const originalData: PersonalData = {
      contactInfo: {
        name: 'John Doe',
        email: 'myemail',
        phone: '1234567890',
        sites: [],
      },
      personalIntro: 'I am a developer',
      roles: {
        role1: 'description1',
      },
    };
    inquirerSpy
      .mockResolvedValueOnce({ personalization: 'contactInfo' })
      .mockResolvedValueOnce({ name: 'John Doe', email: 'myemail', phone: '1234567890' })
      .mockResolvedValueOnce({ shouldUpdate: false })
      .mockResolvedValueOnce({
        personalization: 'exit',
      });
    // .mockResolvedValueOnce({ personalization: 'exit' });
    const updateContactInfoSpy = jest.spyOn(require('../src/updateData/updateContactInfo'), 'updateContactInfo');
    const data = await updatePersonalizedData(originalData);
    expect(updateContactInfoSpy).toHaveBeenCalledWith(originalData.contactInfo);
    expect(updateContactInfoSpy).toHaveBeenCalledTimes(1);
    expect(updateContactInfoSpy).not.toHaveBeenCalledWith(originalData.personalIntro);
    expect(updateContactInfoSpy).toHaveBeenCalledWith(originalData.contactInfo);
  });

  it('should not call the updatePersonalIntro function if contactInfo is selected', async () => {
    const originalData: PersonalData = {
      contactInfo: {
        name: 'John Doe',
        email: 'myemail',
        phone: '1234567890',
        sites: [],
      },
      personalIntro: 'I am a developer',
      roles: {
        role1: 'description1',
      },
    };
    inquirerSpy
      .mockResolvedValueOnce({ personalization: 'personalIntro' })
      .mockResolvedValueOnce({ personalIntro: 'new intro' })
      .mockResolvedValueOnce({ personalization: 'exit' });
    const updateIntroSpy = jest.spyOn(require('../src/updateData/updatePersonalIntro'), 'updatePersonalIntro');
    const data = await updatePersonalizedData(originalData);
    expect(updateIntroSpy).toHaveBeenCalledWith(originalData.personalIntro);
  });

  it('should call the updateRoles function if it is selected', async () => {
    const originalData: PersonalData = {
      contactInfo: {
        name: 'John Doe',
        email: 'myemail',
        phone: '1234567890',
        sites: [],
      },
      personalIntro: 'I am a developer',
      roles: {
        role1: 'description1',
      },
    };
    inquirerSpy
      .mockResolvedValueOnce({ personalization: 'roles' })
      .mockResolvedValueOnce({ roles: 'addRole' })
      .mockResolvedValueOnce({ newRole: 'role3', newRoleDescription: 'description3' })
      .mockResolvedValueOnce({ personalization: 'exit' });
    const updateRolesSpy = jest.spyOn(require('../src/updateData/updateRoles'), 'updateRoles');

    await updatePersonalizedData(originalData);
    expect(updateRolesSpy).toHaveBeenCalledWith(originalData.roles);
  });
});
