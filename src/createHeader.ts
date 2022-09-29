import chalk from 'chalk';
import figlet from 'figlet';
import boxen, { Options } from 'boxen';
import standard from 'figlet/importable-fonts/Standard';

export const createHeader = (): string => {
  const boxenOptions: Options = {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    float: 'center',
    align: 'center',
    borderColor: 'yellow',
    textAlignment: 'center',
  };
  figlet.parseFont('Standard', standard);
  const figText = figlet.textSync('Write My Cover Letter', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 70,
    whitespaceBreak: true,
  });
  const header = chalk.blue(boxen(figText, boxenOptions));
  return header;
};

export const logHeader = () => {
  const header = createHeader();
  console.log(header);
  return header;
};
