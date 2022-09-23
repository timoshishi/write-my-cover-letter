import { Options } from './types';

const fillStrTemplate = (str: string, obj: Record<string, string>) => str.replace(/\${(.*?)}/g, (x, g) => obj[g]);

export const generateParagraphs = ({
  industry,
  company,
  position,
  role,
  value = 'excellence',
  intro,
  contact,
  skills,
  personalData,
}: Options) => {
  const {
    aboutMe: { aboutMe },
    roles,
    industries,
    contactInfo: { name, phone, email, sites },
  } = personalData;

  const industryString = fillStrTemplate(industries[industry], {
    company,
    value,
  });
  const expertise = `My interest was compounded when I noticed that my ${skills} expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}’s continued growth.`;

  const siteString = sites.reduce((str, site, i) => (i !== sites.length - 1 ? `${site} |` : site), '');
  return {
    toWhomItMayConcern: `Dear ${contact || `${company} team`},`,
    introPara: `${intro} ${industryString} ${expertise}`,
    roleStr: roles[role],
    aboutMe: `${aboutMe} ${company} promotes a culture of collaboration, diversity and commitment to quality which is both why I’m happy to be considered and am confident I would fit right in.`,
    closer: `I’m someone who cares about people, be it product users or colleagues, and I strive to demonstrate that in everything I do. I am interested in joining your team because, as ${company} does, I value collaboration, learning and bettering the world with technology. I am looking forward to learning more about ${company}’s vision and discussing how my skill set can help your team achieve its goals. Thank you for your time and consideration.`,
    contactInfo: `${phone} | ${email} | ${siteString}`,
    name: name,
  };
};
