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
  inclusive:
    'I value the fact that you are cultivating a culture of inclusiveness, collaboration, and ${value} in addition to creating an outstanding product.',
  openSource:
    "I believe in sharing knowledge when it benefits the world and through ${company}'s contributions that goal is being realized.",
  healthCare:
    'I believe that technology has the power to effect a positive impact on a health care system that is in need of some renovation and ${company} is a powerful force in making that change.',
  productivity:
    'I believe in the power of productivity tools to improve the lives of people and ${company} is a leader in the field.',
  social: 'I am impressed with the fact that ${company} is providing a service that truly benefits society.',
  tech: 'I am impressed with the quality engineering that ${company} has put forth to make it a leader in [[REPLACE_ME]] and would love to face the unique and interesting challenges that your engineers encounter.',
  foodService:
    'As someone who owned a restaurant I know firsthand the importance of a service like ${company} and would have valued your service and likely used it.',
  education:
    'As a person who has been been to school once or twice and has taught a few people things, ${company} is making great efforts and progress in education with the transformational power of technology.',
  consulting:
    '${company} has a stellar reputation of innovation and opportunities to software engineers of all stripes and I would love to be selected for a role with your company.',
};

export const DEFAULT_RESPONSES = {
  company: 'Acme Generic Company',
  position: 'Carwash Attendant',
  industry: 'generic',
  skills: 'nunchuck skills, computer hacking skills, and bow-hunting',
  intro:
    "I'm interested in Acme because you are a company that would pay me money for the services that I will render. This is very important to me and aligns with my values of being able to pay my rent.",
};

export const DEFAULT_PERSONALIZATION: PersonalData = {
  contactInfo: {
    name: 'Bob Loblaw',
    phone: '(555) 555-5555',
    email: 'bobloblaw@lawblog.com',
    sites: [],
  },
  personalIntro:
    'I am a person who enjoys to do work. I would like to work for you. If you hire me I will do very good work. I enjoy ice fishing, parasailing and have many interesting hobbies that make me a well rounded person.',
  roles: {
    frontend:
      'I am a front end developer who does the front end things. I have built so many things on the front end. Billions and billions. These projects were difficult but enhanced my front end skills and now I build more front end things. All of the things I build on the front end are very impressive',
    backend:
      'I am a back end developer who does back end things. I have built multiple backend things over the years in many languages. All of the languages in fact. It is all very impressive. These projects were difficult but enhanced my back end skills and now I build more back end things.',
  },
};
