const generateParagraphs = require('../lib/generateParagraphs');

const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'yello',
};
test('it should return an object', () => {
  const paras = generateParagraphs(options);
  expect(typeof paras).toBe('object');
  expect(paras).toBeDefined();
});
test('if a contact is provided it toWhomItMayConcern value should include that contacts name', () => {
  const paras = generateParagraphs(options);
  const regex = new RegExp(options.contact);
  expect(paras.toWhomItMayConcern).toMatch(regex);
});

test('if a contact is not provided toWhomItMayConcern should include To the wonderful folks at COMPANY', () => {
  const options = {
    industry: 'generic',
    company: 'RED ALERT',
    position: 'FULL STACK',
    role: 'frontend',
    intro: 'Here is a thing that I have been doing lately',
    contact: undefined,
  };
  const paras = generateParagraphs(options);
  const regex = new RegExp(`To the wonderful folks at ${options.company}`);
  expect(paras.toWhomItMayConcern).toMatch(regex);
});

test('it should return six key value pairs', () => {
  const keys = Object.keys(generateParagraphs(options));
  expect(keys.length).toBe(7);
});
