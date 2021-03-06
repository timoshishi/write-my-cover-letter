const { Command } = require('commander');

const initCommander = () => {
  const program = new Command();
  program.version('0.0.1');
  program
    .requiredOption('-co, --company <string>', 'Required: Company name')
    .requiredOption('-p, --position <string>', 'Required: Position in listing')
    .requiredOption(
      '-in, --intro <string>',
      'Required: Short intro sentence about why the company interests you'
    )
    .option(
      '-r, --role <string>',
      'Specify frontend, backend or fullstack for default paragraphs',
      'fullstack'
    )
    .option(
      '-v, --value <string>',
      'Company value present in the job listing',
      'excellence'
    )
    .option(
      '-i, --industry <string>',
      'Specific industry that the company operates in',
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
    .option('-pdf, --pdf', 'Write pdf file')
    .option('-d, debug', 'boolean to add in debug mode')
    .parse();
  return program.opts();
};

module.exports = initCommander;
