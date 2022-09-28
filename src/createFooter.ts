import terminalImage from 'terminal-image';
import boxen, { Options as BoxenOptions } from 'boxen';
import cfonts from 'cfonts';

const GALAXY_PATH = 'assets/galaxy-brain.jpg';
const HOT_PATH = 'assets/hot-brain.jpg';
const WARM_PATH = 'assets/warm-brain.jpg';

export const createFooter = async (type: 'warm' | 'hot' | 'galaxy') => {
  try {
    const imgPath = {
      warm: WARM_PATH,
      hot: HOT_PATH,
      galaxy: GALAXY_PATH,
    }[type];

    const memeText = {
      warm: 'PERSONALIZING YOUR COVER LETTER',
      hot: 'USING THE DEFAULTS',
      galaxy: 'SPAMMING THE RETURN KEY',
    }[type];

    const imageFile = await terminalImage.file(imgPath, {
      height: '70%',
    });

    const boxenOptions: BoxenOptions = {
      textAlignment: 'center',
      backgroundColor: 'white',
      borderColor: 'black',
      borderStyle: 'single',
    };

    const fontOptions = {
      font: 'console', // console, block, simpleBlock, simple, 3d, simple3d, chrome, huge, shade, slick, grid, pallet, tiny
      colors: ['black'], // define all colors
      background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1, // define letter spacing
      lineHeight: 0.2, // define the line height
      space: false, // define if the output text should have empty lines on top and on the bottom
      maxLength: 100, // define how many character can be on one line
      gradient: false,
      independentGradient: false, // define if you want to recalculate the gradient for each new line
      transitionGradient: false, // define if this is a transition between colors directly
      env: 'node',
    };

    const cTxt = cfonts.render(memeText, fontOptions);
    console.log(boxen(imageFile + cTxt.string, boxenOptions));
    return type;
  } catch (error) {
    console.error(error);
  }
};
