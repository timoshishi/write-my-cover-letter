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
} = options;
console.log({ name });
if (options.debug) console.log(options);
// console.log({ options });

// console.log(industry, companyName);

// const cv = [];
// const whomItMayConcern = `To ${
//   contactName || `the wonderful folks at ${companyName}`
// },`;
// cv.push(whomItMayConcern);

// const expertise = `My React, Javascript and Node.js  expertise aligns very well with your needs for the Full Stack Engineer position and I am excited  to contribute to ${companyName}’s continued growth `;

// const industries = {
//   generic: `I am truly impressed with how ${companyName} is constantly innovating and thinking outside the box in the ${industry} industry,`,
//   socialMedia: `I place high value on the power of technology to bring people together and ${companyName} is paving the way for people to connect more easily,`,
//   inclusive: `I value the fact that you are cultivating a culture of inclusiveness, collaboration, and ${value} in addition to creating an outstanding product,`,
//   openSource: `I believe in sharing knowledge when it benefits the world and through ${companyName}'s contributions`,
// };
// cv.push(`${introSentence} ${industries[industry]}`);

// const aboutMe = `I am a lifelong learner with a passion for tackling large, complex problems and taking an unconventional approach when needed. Programming is my passion and I am eager to get to writing code each day. The characteristics that make me a strong team player are that I respect my colleagues, actively listen, and both provide and receive constructive feedback. My passion for learning and constant improvement as a developer across various web technologies makes me a value added proposition to your team. ${companyName} promotes a culture of ${value} and collaboration which is both why I’m happy to be considered and am confident I’d fit right in.`;

// cv.push(aboutMe);

// // const whyImInterested = ``

// // const whyImAwesome = ``;

// fs.writeFile(
//   `${name.split(' ').join('_')}_CV.txt`,
//   cv.join('\n\n'),
//   'utf8',
//   function (err) {
//     if (err) return console.log(err);
//     console.log('CV written you lazy bastard!');
//   }
// );
