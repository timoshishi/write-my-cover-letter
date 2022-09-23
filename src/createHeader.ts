import chalk from 'chalk';
import figlet from 'figlet';
import boxen, { Options } from 'boxen';

const boxenOptions: Options = {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  float: 'center',
  align: 'center',
  borderColor: 'yellow',
};

const createHeader = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    figlet.text(
      'Write My Cover Letter',
      {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 70,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          reject(err);
          return;
        }
        if (data) {
          resolve(console.log(chalk.blue(boxen(data, boxenOptions))));
        }
      }
    );
  });
};

module.exports = { createHeader };
