import { generateParagraphs } from '../src/generateParagraphs';
import { PersonalData, TextResponses, CVText } from '../src/types';
import { INDUSTRIES } from '../src/constants';

const textResponses: TextResponses = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  skills: 'JavaScript, React, TypeScript',
};

const personalData: PersonalData = {
  contactInfo: {
    name: 'John Doe',
    email: 'jdoe@test.com',
    phone: '555-555-5555',
    sites: ['https://johndoe.com', 'linkedin.com'],
  },
  aboutMe: {
    aboutMe: 'I am a person who does things',
  },
  roles: {
    frontend: 'I am a frontend developer',
    backend: 'I am a backend developer',
    fullstack: 'I am a fullstack developer',
  },
  industries: INDUSTRIES,
};

describe('generateParagraphs', () => {
  let generateParagraphsOptions: { textResponses: TextResponses; personalData: PersonalData };

  beforeEach(() => {
    generateParagraphsOptions = {
      textResponses,
      personalData,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should return an object with the CVResponses type properties', () => {
    const cvText: CVText = generateParagraphs(generateParagraphsOptions);
    expect(cvText).toHaveProperty('toWhomItMayConcern');
    expect(cvText).toHaveProperty('introPara');
    expect(cvText).toHaveProperty('roleStr');
    expect(cvText).toHaveProperty('aboutMe');
    expect(cvText).toHaveProperty('closer');
    expect(cvText).toHaveProperty('contactInfo');
  });

  test('all properties should be strings with length', () => {
    const cvText: CVText = generateParagraphs(generateParagraphsOptions);
    console.log('cvText', JSON.stringify(cvText, null, 2));
    expect(Object.values(cvText).every((value) => typeof value === 'string')).toBe(true);
    expect(Object.values(cvText).every((value) => value.length > 0)).toBe(true);
  });
  test('it should return the correct text for toWhomItMayConcern', () => {
    const cvText: CVText = generateParagraphs(generateParagraphsOptions);
    expect(cvText.toWhomItMayConcern).toBe('Dear RED ALERT team,');
    expect(cvText.toWhomItMayConcern.includes(textResponses.company)).toBe(true);
  });
  test('it should return the correct text for introPara', () => {
    const cvText: CVText = generateParagraphs(generateParagraphsOptions);
    expect(cvText.introPara.includes('Here is a thing that I have been doing lately')).toBeTruthy();
    expect(cvText.introPara.includes(textResponses.skills)).toBeTruthy();
  });
  test('it should return the correct text for roleStr', () => {
    const cvText: CVText = generateParagraphs(generateParagraphsOptions);
    expect(cvText.roleStr).toBe('I am a frontend developer');
  });
  test('it should return the correct text for aboutMe', () => {
    const { aboutMe } = generateParagraphs(generateParagraphsOptions);
    expect(aboutMe.startsWith(personalData.aboutMe.aboutMe)).toBeTruthy();
    expect(aboutMe.includes(textResponses.company)).toBeTruthy();
    expect(aboutMe.includes('culture')).toBeTruthy();
  });
  test('it should return the correct text for closer', () => {
    const { closer } = generateParagraphs(generateParagraphsOptions);
    expect(closer.includes(textResponses.company)).toBeTruthy();
    expect(closer.includes('learning more')).toBeTruthy();
  });
  test('it should return the correct text for contactInfo', () => {
    const { contactInfo } = generateParagraphs(generateParagraphsOptions);
    console.log('contactInfo', contactInfo);
    expect(contactInfo.includes(personalData.contactInfo.email)).toBeTruthy();
    expect(contactInfo.includes(personalData.contactInfo.phone)).toBeTruthy();
    expect(contactInfo.includes(personalData.contactInfo.sites[0])).toBeTruthy();
    expect(contactInfo.includes(personalData.contactInfo.sites[1])).toBeTruthy();
    expect(contactInfo.endsWith('|')).toBeFalsy();
  });
});
