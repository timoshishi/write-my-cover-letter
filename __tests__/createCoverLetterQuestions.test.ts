import { createCoverLetterQuestions } from '../src/createCoverLetterQuestions';
import { personalData } from '../__mocks__';

describe('createCoverLetterQuestions', () => {
  it('it should return an array', () => {
    const questions = createCoverLetterQuestions(personalData);
    expect(Array.isArray(questions)).toEqual(true);
  });

  it('all questions in array should have a type, name and message property', () => {
    const questions = createCoverLetterQuestions(personalData);
    const hasAllProps = questions.every((ques) => {
      return ques.hasOwnProperty('type') && ques.hasOwnProperty('name') && ques.hasOwnProperty('message');
    });
    expect(hasAllProps).toEqual(true);
  });

  it('choices with a name of outputTypes should have two choices one with name docx the other with pdf', () => {
    const questions = createCoverLetterQuestions(personalData);
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

  it('choices with a name of createCopy should have two choices one with name yes the other with no', () => {
    const questions = createCoverLetterQuestions(personalData);
    const createCopy = questions.find((ques) => {
      return ques.name === 'createCopy';
    });
    expect(createCopy).not.toBeUndefined();
    expect(createCopy?.default).toEqual(true);
  });
});
