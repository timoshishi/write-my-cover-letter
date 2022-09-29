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

  const boxenOptions: BoxenOptions = {
    textAlignment: 'center',
    align: 'center',
    borderColor: 'black',
    borderStyle: 'single',
  };

  try {
    /* Setup font to print congrats message */
    figlet.parseFont('Pagga', pagga);
    const congrats = 'Noice!';
    const padLength = Math.min(3, Math.floor(memeText.length / 2 - congrats.length));
    const padded = ' '.repeat(padLength) + congrats + ' '.repeat(padLength);
    const nicelyDone = figlet.textSync(padded, {
      font: 'Pagga',
    });

    const imageFile = await terminalImage.file(imgPath, {
      height: '50%',
    });

    /* log the meme */
    console.log(
      boxen(imageFile + memeText, {
        ...boxenOptions,
        backgroundColor: 'white',
      })
    );

    /* log congratulatory message */
    console.log(boxen(chalk.white(nicelyDone), { ...boxenOptions }));

    return type;
  } catch (error) {
    console.error(error);
  }
};
