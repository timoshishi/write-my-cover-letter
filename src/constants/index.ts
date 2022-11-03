import { PersonalData } from '../types';

export const DEFAULT_STYLES = {
  size: 22,
  style: 'wellSpaced',
  font: 'Arial',
};

export const INDUSTRIES = {
  generic: 'I am truly impressed with how ${company} is constantly innovating and thinking outside the box.',
  socialMedia:
    'I place high value on the power of technology to bring people together and ${company} is paving the way for people to connect more easily.',
  productivity:
    'I believe in the power of productivity tools to improve the lives of people and ${company} is a leader in the field.',
  foodService:
    'As someone who owned a restaurant I know firsthand the importance of a service like ${company} and would have valued your service and likely used it had I been aware of it.',
  consulting:
    '${company} has a stellar reputation of innovation and opportunities to software engineers of all stripes and I would love to be selected for a role with your company.',
};

export const DEFAULT_RESPONSES = {
  company: 'Acme Generic Company',
  position: 'Generic Job',
  industry: 'generic',
  skills: 'Node.js, React, and nunchucks',
  intro: "I'm interested in working for Acme Generic Company because I like the canned goods you produce.",
};

export const DEFAULT_PERSONALIZATION: PersonalData = {
  contactInfo: {
    name: 'Bob Loblaw',
    phone: '(555) 555-5555',
    email: 'bobloblaw@lawblog.com',
    sites: [],
  },
  personalIntro:
    'I am a person who enjoys making things and would like to make them there. If you hire me I will do very good work. I enjoy ice fishing, parasailing and have many interesting hobbies.',
  roles: {
    frontend:
      'I am a front end developer who likes to build front end applications. I have built so many things on the front end. These projects were difficult but enhanced my front end skills and now I build more applications. All of the things I build on the front end are very impressive.',
    backend:
      'I am a back end developer who can build back end applications. I have built multiple back end things over the years in many languages. These projects were difficult but enhanced my back end skills and now I build more back end things.',
  },
};
