import { updatePersonalIntro, createInitialRolesListQuestions } from '../src/updateDataQuestions';

describe('updatePersonalIntro', () => {
  it('it should return an array of objects with the correct keys', () => {
    const testResponseOBj = {
      type: 'input',
      name: 'personalIntro',
      message: 'Add an intro about yourself',
      default: 'personalIntro',
    };
    const questions = updatePersonalIntro('personalIntro');
    expect(questions).toEqual([testResponseOBj]);
  });

  it('should return an empty string if there is an empty string passed in', () => {
    const questions = updatePersonalIntro('');
    expect(questions[0].default).toEqual('');
  });

  it('should return the string passed in as the key of default', () => {
    const questions = updatePersonalIntro('personalIntro');
    expect(questions[0].default).toEqual('personalIntro');
  });
});
describe('createInitialRolesListQuestions', () => {
  it('it should return an array of objects with the correct keys', () => {
    const questions = createInitialRolesListQuestions({
      backend: 'role',
      frontend: 'here is a descritption of why i am super cool',
      fullstack: 'role',
    });
    expect(Object.keys(questions[0])).toEqual(['type', 'name', 'message', 'default']);
  });

  it('should return an empty string if there is an empty string passed in as the role', () => {
    const questions = createInitialRolesListQuestions({
      backend: '',
      frontend: '',
      fullstack: 'i am fullstack',
    });
    expect(questions[0].default).toEqual('');
    expect(questions[1].default).toEqual('');
    expect(questions[2].default).toEqual('i am fullstack');
  });

  it('should have a message with the key of the role passed in included', () => {
    const questions = createInitialRolesListQuestions({
      backend: '',
      frontend: '',
      fullstack: 'i am fullstack',
    });
    expect(questions[0].message).toEqual('Update the description for backend');
    expect(questions[1].message).toEqual('Update the description for frontend');
    expect(questions[2].message).toEqual('Update the description for fullstack');
  });

  it('should have a default of the value of the role passed in', () => {
    const questions = createInitialRolesListQuestions({
      backend: '',
      frontend: '',
      fullstack: 'i am fullstack',
    });
    expect(questions[0].default).toEqual('');
    expect(questions[1].default).toEqual('');
    expect(questions[2].default).toEqual('i am fullstack');
  });

  it('should return the same about of objects as there are keys in the object passed in', () => {
    const questions = createInitialRolesListQuestions({
      backend: '',
      frontend: '',
      fullstack: 'i am fullstack',
    });
    expect(questions.length).toEqual(3);
  });

  it('should return defaults with the same length messages for each message in the object passed in', () => {
    const rolesOb = {
      backend: '',
      frontend: '',
      fullstack: 'i am fullstack',
    };
    const questions = createInitialRolesListQuestions(rolesOb);
    expect(questions[0].default.length).toBe(0);
    expect(questions[1].default.length).toBe(0);
    expect(questions[2].default.length).toBe(rolesOb.fullstack.length);
  });
});
