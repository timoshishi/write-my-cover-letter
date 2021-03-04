const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'cvPersonalization');
const roles = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'roles.json')));
const { aboutMe } = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'aboutMe.json'))
);
const contactInfo = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'contactInfo.json'))
);
const generateParagraphs = ({
  email,
  phone,
  industry,
  company,
  position,
  role,
  value,
  intro,
  contact,
}) => {
  const industries = {
    generic: `I am truly impressed with how ${company} is constantly innovating and thinking outside the box.`,
    socialMedia: `I place high value on the power of technology to bring people together and ${company} is paving the way for people to connect more easily,`,
    inclusive: `I value the fact that you are cultivating a culture of inclusiveness, collaboration, and ${value} in addition to creating an outstanding product,`,
    openSource: `I believe in sharing knowledge when it benefits the world and through ${company}'s contributions`,
  };

  const expertise = `My React, Javascript and Node.js expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}’s continued growth.`;
  console.log({ contactInfo });
  const siteString = contactInfo.sites.reduce(
    (str, site, i) => (i !== contactInfo.sites.length - 1 ? `${site} |` : site),
    ''
  );
  return {
    toWhomItMayConcern: `To ${contact || `the wonderful folks at ${company}`},`,
    introPara: `${company} ${intro} ${industries[industry]} ${expertise}`,
    role: roles[role],
    aboutMe: `${aboutMe} ${company} promotes a culture of ${value} and collaboration which is both why I’m happy to be considered and am confident I’d fit right in.`,
    closer: `I’m someone who cares about people, be it product users or colleagues, and I strive to demonstrate that in everything I do. I am interested in joining your team because, as ${company} does, I value collaboration, learning and bettering the world with technology. I am looking forward to learning more about ${company}’s vision and discussing how my skill set can help your team achieve its goals. Are you available in the next week to discuss the role in more detail? Thank you for your time and consideration.`,
    contactInfo: `${contactInfo.phone} | ${email} | ${siteString}`,
  };
};

module.exports = {
  generateParagraphs,
};
