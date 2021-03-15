const fs = require('fs');
const path = require('path');
// const fillStrTemplate = require('./templateParser');

const DATA_DIR = path.join(__dirname, 'cvPersonalization');
const roles = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'roles.json')));

// const industries = JSON.parse(
//   fs.readFileSync(path.join(DATA_DIR, 'industries.json'))
// );
/**
 * generateParagraphs
 * @param {String} industry Industry of company
 * @param {String} company Name of company
 * @param {String} name Your name
 * @param {String} position Position listed in job Ad
 * @param {String} value A value the company holds
 * @param {String} intro Introductory sentence about what draws you to the company
 * @param {String} contact Contact or hiring manager at the company
 * @returns {object}
 */

const fillStrTemplate = (str, obj) =>
  str.replace(/\${(.*?)}/g, (x, g) => obj[g]);

const generateParagraphs = ({
  industry,
  company,
  position,
  role,
  value = 'pushing the boundaries of what is possible',
  intro,
  contact,
  skills,
  personalData,
}) => {
  const { name, phone, email, sites } = personalData.contactInfo;
  const { aboutMe, roles, industries } = personalData;
  const industryString = fillStrTemplate(industries[industry], {
    company,
    value,
  });

  const expertise = `My ${skills} expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}’s continued growth.`;

  const siteString = sites.reduce(
    (str, site, i) => (i !== sites.length - 1 ? `${site} |` : site),
    ''
  );
  return {
    toWhomItMayConcern: `To ${contact || `the wonderful folks at ${company}`},`,
    introPara: `${intro} ${industryString} ${expertise}`,
    role: roles[role],
    aboutMe: `${aboutMe.aboutMe} ${company} promotes a culture of collaboration and commitment to quality which is both why I’m happy to be considered and am confident I would fit right in.`,
    closer: `I’m someone who cares about people, be it product users or colleagues, and I strive to demonstrate that in everything I do. I am interested in joining your team because, as ${company} does, I value collaboration, learning and bettering the world with technology. I am looking forward to learning more about ${company}’s vision and discussing how my skill set can help your team achieve its goals. Thank you for your time and consideration.`,
    contactInfo: `${phone} | ${email} | ${siteString}`,
    name: name,
  };
};

module.exports = generateParagraphs;
