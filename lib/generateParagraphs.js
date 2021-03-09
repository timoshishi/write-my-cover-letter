const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'cvPersonalization');
const roles = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'roles.json')));

const { aboutMe } = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'aboutMe.json'))
);
const { email, sites, phone, name } = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'contactInfo.json'))
);

const generateParagraphs = ({
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
    socialMedia: `I place high value on the power of technology to bring people together and ${company} is paving the way for people to connect more easily.`,
    inclusive: `I value the fact that you are cultivating a culture of inclusiveness, collaboration, and ${value} in addition to creating an outstanding product.`,
    openSource: `I believe in sharing knowledge when it benefits the world and through ${company}'s contributions that goal is being realized.`,
    productivity: `I believe in the power of productivity tools to improve the lives of people and ${company} is a leader in the field.`,
    social: `I am impressed with the fact that ${company} is providing a service that truly benefits society.`,
    tech: `I am impressed with quality engineering that ${company} has put forth to make it a leader in XXXX and would love to face the unique and interesting challenges that your engineers face.`,
    foodService: `As someone who owned a restaurant I know firsthand the importance of a service like Lunchbox and would have valued your service and likely used it.`,
  };

  const expertise = `My Javascript, React, and Node.js expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}’s continued growth.`;
  const siteString = sites.reduce(
    (str, site, i) => (i !== sites.length - 1 ? `${site} |` : site),
    ''
  );
  return {
    toWhomItMayConcern: `To ${contact || `the wonderful folks at ${company}`},`,
    introPara: `${intro} ${industries[industry]} ${expertise}`,
    role: roles[role],
    aboutMe: `${aboutMe} ${company} promotes a culture of collaboration and commitment to quality which is both why I’m happy to be considered and am confident I would fit right in.`,
    closer: `I’m someone who cares about people, be it product users or colleagues, and I strive to demonstrate that in everything I do. I am interested in joining your team because, as ${company} does, I value collaboration, learning and bettering the world with technology. I am looking forward to learning more about ${company}’s vision and discussing how my skill set can help your team achieve its goals. Thank you for your time and consideration.`,
    contactInfo: `${phone} | ${email} | ${siteString}`,
    name: name,
  };
};

module.exports = generateParagraphs;
