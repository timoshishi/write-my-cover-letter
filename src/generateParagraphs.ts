import { PersonalData, TextResponses, CVText } from './types';
import { INDUSTRIES } from './constants';

const fillStrTemplate = (str: string, obj: Record<string, string>) => str.replace(/\${(.*?)}/g, (x, g) => obj[g]);

export const generateParagraphs = ({
  textResponses,
  personalData,
}: {
  textResponses: TextResponses;
  personalData: PersonalData;
}): CVText => {
  const {
    personalIntro,
    roles,
    contactInfo: { phone, email, sites },
  } = personalData;
  const { industry, company, position, role, intro, skills } = textResponses;

  const industryString = fillStrTemplate(INDUSTRIES[industry], {
    company,
  });

  const expertise = `My interest was compounded when I noticed that my ${skills} expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}'s continued growth.`;

  return {
    toWhomItMayConcern: `Dear ${company} team,`,
    introPara: `${intro} ${industryString} ${expertise}`,
    roleStr: roles[role],
    personalIntro: `${personalIntro} ${company} promotes a culture of collaboration and commitment to quality, which is why I'm happy to be considered and am confident I would fit right in.`,
    closer: `I am looking forward to learning more about ${company}'s vision and discussing how my skill set can help your team achieve its goals. Thank you for your time and consideration.`,
    contactInfo: [phone, email, ...sites].join(' | '),
  };
};
