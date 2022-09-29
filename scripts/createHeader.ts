import chalk from 'chalk';
import figlet from 'figlet';
import boxen, { Options } from 'boxen';
import standard from 'figlet/importable-fonts/Standard';
const boxenOptions: Options = {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  float: 'center',
  align: 'center',
  borderColor: 'yellow',
  textAlignment: 'center',
};

export const createHeader = (): string => {
  figlet.parseFont('Standard', standard);
  const figText = figlet.textSync('Write My Cover Letter', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 70,
    whitespaceBreak: true,
  });
  const header = chalk.blue(boxen(figText, boxenOptions));
  console.log(header);
  return header;
};
