import { createRoleOptions, updateRoles } from '../src/updateData/updateRoles';

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
