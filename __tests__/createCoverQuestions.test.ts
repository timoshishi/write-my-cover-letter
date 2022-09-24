import { createCoverQuestions } from '../src/createCoverQuestions';
import { personalData } from '../__mocks__';

describe('createCoverQuestions', () => {
  test('it should return an array', () => {
    const questions = createCoverQuestions(personalData);
    expect(Array.isArray(questions)).toEqual(true);
  });

  test('all questions in array should have a type, name and message property', () => {
    const questions = createCoverQuestions(personalData);
    const hasAllProps = questions.every((ques) => {
      return ques.hasOwnProperty('type') && ques.hasOwnProperty('name') && ques.hasOwnProperty('message');
    });
    expect(hasAllProps).toEqual(true);
  });

  test('choices with a name of outputTypes should have two choices one with name docx the other with pdf', () => {
    const questions = createCoverQuestions(personalData);
    const outputTypes = questions.find((ques) => {
      return ques.name === 'outputTypes';
    });
    expect(outputTypes).not.toBeUndefined();
    if (outputTypes) {
      expect(outputTypes.choices).toEqual([
        { name: 'docx', checked: true },
        { name: 'pdf', checked: false },
      ]);
    }
  });

  test('choices with a name of createCopy should have two choices one with name yes the other with no', () => {
    const questions = createCoverQuestions(personalData);
    const createCopy = questions.find((ques) => {
      return ques.name === 'createCopy';
    });
    expect(createCopy).not.toBeUndefined();
    expect(createCopy?.default).toEqual(true);
  });
});
