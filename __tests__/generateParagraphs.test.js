const generateParagraphs = require('../lib/generateParagraphs');
const readPersonalization = require('../lib/readPersonalization');

const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'hello',
  personalData: readPersonalization(),
};
test('it should return an object', () => {
  const paras = generateParagraphs(options);
  console.log({ paras });
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
    personalData: readPersonalization(),
  };
  const paras = generateParagraphs(options);
  const regex = new RegExp(`To the wonderful folks at ${options.company}`);
  expect(paras.toWhomItMayConcern).toMatch(regex);
});

test('it should return six key value pairs', () => {
  const keys = Object.keys(generateParagraphs(options));
  expect(keys.length).toBe(7);
});

test('all values returned should have length', () => {
  const allHaveLength = Object.values(generateParagraphs(options)).every(
    (value) => value.length > 0
  );
  expect(allHaveLength).toBe(true);
});

test('no values should have no length', () => {
  const someHaveNoLength = Object.values(generateParagraphs(options)).some(
    (value) => value.length === 0
  );
  expect(someHaveNoLength).toBe(false);
});

test('name should have a length', () => {
  const { name } = generateParagraphs(options);
  expect(name).toBeDefined();
});
