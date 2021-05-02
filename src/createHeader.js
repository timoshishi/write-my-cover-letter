const figlet = require('figlet');
const chalk = require('chalk');
const boxen = require('boxen');
const { yellow } = require('chalk');

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  float: 'center',
  align: 'center',
  borderColor: 'yellow',
};

const createHeader = () => {
  return new Promise((resolve, reject) => {
    figlet.text(
      'Write My Cover Letter',
      {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 70,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          reject();
          return;
        }
        resolve(console.log(chalk.blue(boxen(data, boxenOptions))));
      }
    );
  });
};

module.exports = { createHeader };
