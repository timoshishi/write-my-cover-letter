const { Command } = require('commander');

const initCommander = () => {
  const program = new Command();
  program.version('0.0.1');
  program
    .requiredOption('-co, --company <string>', 'add a company name')
    .requiredOption(
      '-p, --position <string>',
      'specify name of position listed in the job listing'
    )
    .option(
      '-r, --role <string>',
      'specify frontend, backend or fullstack',
      'fullstack'
    )
    .option(
      '-in, --intro <string>',
      'add a short intro about why the company interests you',
      'What I love about software engineering is that there is no time to be complacent; technologies are changing constantly and I love the challenges of continual improvement and learning.'
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
    .option('-dx, --docx', 'write your cv in .docx format')
    .option('-tx, --txt', 'write your cv in .txt format')
    .option(
      '-p, --phone <string>',
      'add your phone number in the format you wanted it presented',
      '(734) 353-0951'
    )
    .option('-e, --email <type>', 'add your email', 'timfrrst@gmail.com')
    .option('-d, debug', 'boolean to add in debug mode')
    .parse();
  return program.opts();
};

module.exports = initCommander;
