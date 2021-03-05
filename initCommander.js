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
const options = program.opts();

module.exports = {
  options,
};
