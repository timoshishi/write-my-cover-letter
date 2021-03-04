const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
  .requiredOption('-c, --company <string>', 'add a company name')
  .requiredOption(
    '-p, --position <string>',
    'specify name of position listed in the job listing'
  )
  .requiredOption(
    '-r, --role <string>',
    'specify frontend, backend or fullstack'
  )
  .requiredOption(
    '-in, --intro <string>',
    'add a short intro about why the company interests you'
  )
  .option(
    '-v, --value <string>',
    'add a value present in the job listing',
    'excellence'
  )
  .option(
    '-i, --industry <string>',
    'add the industry space of the company',
    'generic'
  )
  .option('-c, --contact <string>', 'enter the name of a contact')
  .option('-n, --name <string>', 'add your name', 'Tim Forrest')
  .option(
    '-p, --phone <string>',
    'add your phone number in the format you wanted it presented',
    '(734) 353-0951'
  )
  .option('-e, --email <type>', 'add your email', 'timfrrst@gmail.com')
  .option('-d, debug', 'boolean to add in debug mode')
  .parse();
const options = program.opts();
const {
  name,
  email,
  phone,
  industry,
  company,
  position,
  role,
  value,
  intro,
  contact,
} = options;
console.log({ name });
if (options.debug) console.log(options);

const expertise = `My React, Javascript and Node.js expertise aligns very well with your needs for the ${position} position and I am excited to contribute to ${company}’s continued growth `;

const industries = {
  generic: `I am truly impressed with how ${company} is constantly innovating and thinking outside the box.`,
  socialMedia: `I place high value on the power of technology to bring people together and ${company} is paving the way for people to connect more easily,`,
  inclusive: `I value the fact that you are cultivating a culture of inclusiveness, collaboration, and ${value} in addition to creating an outstanding product,`,
  openSource: `I believe in sharing knowledge when it benefits the world and through ${company}'s contributions`,
};

const aboutMe = `I am a lifelong learner with a passion for tackling large, complex problems and taking an unconventional approach when needed. Programming is my passion and I am eager to get to writing code each day. The characteristics that make me a strong team player are that I respect my colleagues, actively listen, and both provide and receive constructive feedback. My passion for learning and constant improvement as a developer across various web technologies makes me a value added proposition to your team. ${company} promotes a culture of ${value} and collaboration which is both why I’m happy to be considered and am confident I’d fit right in.`;

const roles = {
  frontend: `My experience with modern, full stack Javascript, non-relational as well as relational databases makes me the kind of developer that can bring value to any team. Working remotely with a team of three developers I recently built the front end for an ecommerce store using React.js and reactstrap with microservices and a headless API to deploy to AWS. My performance improvements led to a 90+ Google Lighthouse score. This project is just one of many that I have worked on that has led to success beyond what was required and all the while enjoying the challenges of working in team based settings.`,
  fullstack: `My experience with modern, full stack Javascript, Node.js, non-relational as well as relational databases makes me the kind of developer that can bring value to any team. I recently built a Tinder clone for puppies to meet puppies using React, Node.js, PostgreSQL, and AWS. This project’s success led to a 37 fold increase in puppies meeting puppies in pandemic times. This project is just one of many that I have worked on that has led to success beyond what was required and all the while enjoying the challenges and rewards of working in team based settings.`,
  backend: `My experience with modern, full stack Javascript, non-relational as well as relational databases makes me the kind of developer that can bring value to any team. Working remotely with a team of three developers I recently refactored a database and an API on Amazon Web Services into a PostgreSQL and Express back end that performantly queried a database and was able to handle up to 68,000 requests per minute on horizontally scaled EC2 micro instances. Our clear communication, teamwork and technical expertise led us to perform above and beyond the project specifications. This project is just one of many that I have worked on that has led to success beyond what was required and all the while enjoying the challenges of working in team based settings.`,
};
const closer = `I’m someone who cares about people, be it product users or colleagues, and I strive to demonstrate that in everything I do. I am interested in joining your team because as you do I value collaboration learning and creating an excellent product. I am looking forward to learning more about ${company}’s vision and discussing how my skill set can help your team achieve its goals. Are you available in the next week to discuss the role in more detail? Thank you for your time and consideration.`;

const generateParagraph = (...args) => `${args.join(' ')}\n`;
const cv = [];
const toWhomItMayConcern = `To ${
  contact || `the wonderful folks at ${company}`
},`;

cv.push(toWhomItMayConcern);
cv.push(
  generateParagraph(
    `${company} ${intro} ${industries[industry]} ${industries.inclusive} ${expertise}`
  )
);
cv.push(generateParagraph(aboutMe));
cv.push(generateParagraph(roles[role]));
cv.push(generateParagraph(closer));
cv.push(
  `BestWishes,
${name}
{phone} | ${email} | linkedin.com/in/timfrrst | github.com/timoshishi`
);

fs.writeFile(
  `${name.split(' ').join('_')}_CV.txt`,
  cv.join('\n'),
  'utf8',
  function (err) {
    if (err) return console.log(err);
    console.log('CV written you lazy bastard!');
  }
);
