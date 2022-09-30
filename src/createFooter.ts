import terminalImage from 'terminal-image';
import boxen, { Options as BoxenOptions } from 'boxen';
import path from 'path';
import figlet from 'figlet';
import pagga from 'figlet/importable-fonts/Pagga';
import chalk from 'chalk';

export const createFooter = async (type: 'warm' | 'hot' | 'galaxy') => {
  const basePath = path.resolve(__dirname, '..', 'assets');
  const HOT_PATH = path.join(basePath, 'hot-brain.jpg');
  const WARM_PATH = path.join(basePath, 'warm-brain.jpg');
  const GALAXY_PATH = path.join(basePath, 'galaxy-brain.jpg');

  const imgPath = {
    warm: WARM_PATH,
    hot: HOT_PATH,
    galaxy: GALAXY_PATH,
  }[type];

  const memeText = {
    warm: 'PERSONALIZING YOUR COVER LETTER',
    hot: 'USING DEFAULT PERSONAL DATA',
    galaxy: 'USING DEFAULTS AND \nSPAMMING THE RETURN KEY',
  }[type];

  const memeBoxOptions: BoxenOptions = {
    textAlignment: 'center',
    align: 'center',
    borderColor: 'black',
    borderStyle: 'single',
    backgroundColor: 'white',
  };

  const footerBoxOptions: BoxenOptions = {
    borderStyle: 'double',
    float: 'center',
    align: 'center',
    borderColor: 'yellow',
    textAlignment: 'center',
  };

  /* construct the footer message */
  const footerMessage = 'Noice!';
  const padLength = Math.min(3, Math.floor(memeText.length / 2 - footerMessage.length));
  const paddedMessage = ' '.repeat(padLength) + footerMessage + ' '.repeat(padLength);

  try {
    /* Setup font to print congrats message */
    figlet.parseFont('Pagga', pagga);
    const coverLetterFinishedText = figlet.textSync(paddedMessage, {
      font: 'Pagga',
    });

    /* Create image string meme */
    const imageFile = await terminalImage.file(imgPath, {});
    const meme = boxen(imageFile + memeText, memeBoxOptions);

    /* Create final footer string */
    const footer = chalk.blue(boxen(coverLetterFinishedText + '\n' + meme, footerBoxOptions));

    console.log(footer);

    return type;
  } catch (error) {
    console.error(error);
  }
};
