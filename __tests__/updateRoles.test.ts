import { createRoleOptions, updateRoles } from '../src/updateData/updateRoles';
import inquirer from 'inquirer';

describe('updateRoles', () => {
  let inquirerSpy: jest.SpyInstance;
  let writeSpy: jest.SpyInstance;

  beforeEach(() => {
    inquirerSpy = jest.spyOn(inquirer, 'prompt');
    writeSpy = jest.spyOn(require('../src/utils'), 'writeJSONToDisk').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the old roles plus a new one if a user chooses to add a new role', async () => {
    const oldRoles = {
      role1: 'description1',
      role2: 'description2',
    };

    inquirerSpy.mockResolvedValueOnce({ roles: 'addRole' });
    inquirerSpy.mockResolvedValueOnce({ newRole: 'role3', newRoleDescription: 'description3' });

    const newRoles = await updateRoles(oldRoles);
    expect(newRoles).toEqual({ ...oldRoles, role3: 'description3' });
  });

  it('should call writeToDisk with the updatedRoles', async () => {
    const oldRoles = {
      role1: 'description1',
      role2: 'description2',
    };

    inquirerSpy.mockResolvedValueOnce({ roles: 'addRole' });
    inquirerSpy.mockResolvedValueOnce({ newRole: 'role5', newRoleDescription: 'description3' });

    await updateRoles(oldRoles);
    expect(writeSpy).toHaveBeenCalledWith('roles', { ...oldRoles, role5: 'description3' }, 'cvPersonalization');
  });

  it('should update a role description if update role is selected', async () => {
    const oldRoles = {
      role1: 'description1',
      role2: 'description2',
    };

    inquirerSpy.mockResolvedValueOnce({ roles: 'role1' });
    inquirerSpy.mockResolvedValueOnce({ updatedDescription: 'newer Description' });

    const newRoles = await updateRoles(oldRoles);
    expect(newRoles).toEqual({ ...oldRoles, role1: 'newer Description' });
  });
});

describe('createRoleOptions', () => {
  it('should return an array of objects with name, message and default properties', () => {
    const roles = {
      role1: 'role1 description',
      role2: 'role2 description',
    };

    const results = createRoleOptions(roles);
    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('name');
    expect(results[0]).toHaveProperty('message');
    expect(results[0]).toHaveProperty('default');
  });

  it('should have the correct values for the name, message and default properties', () => {
    const roles = {
      role1: 'role1 description',
      role2: 'role2 description',
    };

    const results = createRoleOptions(roles);
    expect(results[0].name).toEqual('role1');
    expect(results[0].message).toEqual('Update the description for role1');
    expect(results[0].default).toEqual('role1 description');
  });
});
