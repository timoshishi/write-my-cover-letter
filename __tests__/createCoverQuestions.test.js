const createCoverQuestions = require('../lib/createCoverQuestions');
const readPersonalization = require('../lib/readPersonalization');

const personalData = {
  roles: { brasco: 'donnie', vito: 'genovese' },
  industries: {
    fisheries: 'pescado',
    moneyMaking: 'dollars',
    interrogation: 'ask nicely',
  },
};

const questions = createCoverQuestions(personalData);
test('it should return an array', () => {
  expect(Array.isArray(questions)).toEqual(true);
});

test('role should be a length of 2', () => {
  const roleLength = questions.reduce((len, ques) => {
    if (ques.name === 'role') {
      len = ques.choices.length;
      return len;
    } else {
      return len;
    }
  }, 0);
  expect(roleLength).toEqual(2);
});

test('industry should be a length of 3', () => {
  const roleLength = questions.reduce((len, ques) => {
    if (ques.name === 'industry') {
      len = ques.choices.length;
      return len;
    } else {
      return len;
    }
  }, 0);
  expect(roleLength).toEqual(3);
});

test('all questions in array should have a type, name and message property', () => {
  const hasAllProps = questions.every((ques) => {
    return (
      ques.hasOwnProperty('type') &&
      ques.hasOwnProperty('name') &&
      ques.hasOwnProperty('message')
    );
  });
  expect(hasAllProps).toEqual(true);
});
