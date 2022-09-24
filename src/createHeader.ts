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

export const createHeader = (): Promise<string> => {
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
          reject(err);
          return;
        }
        if (data) {
          const header = chalk.blue(boxen(data, boxenOptions));
          console.log(header);
          // for unit testing
          resolve(chalk.blue(boxen(data, boxenOptions)));
        }
      }
    );
  });
};
