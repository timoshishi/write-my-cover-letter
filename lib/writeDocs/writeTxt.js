const fs = require('fs');
// const { generateParagraphs } = require('./letterBody.js');

const writeTxt = ({
  contactInfo,
  role,
  aboutMe,
  closer,
  introPara,
  toWhomItMayConcern,
  name,
}) => {
  const cv = [];
  const generateParagraph = (...args) => `${args.join(' ')}\n`;
  cv.push(toWhomItMayConcern);
  cv.push(generateParagraph(introPara));
  cv.push(generateParagraph(aboutMe));
  cv.push(generateParagraph(role));
  cv.push(generateParagraph(closer));
  cv.push(`BestWishes,\n${name}\n${contactInfo}`);
  fs.writeFile(
    `${name.split(' ').join('_')}_CV.txt`,
    cv.join('\n'),
    'utf8',
    function (err) {
      if (err) return err;
      console.log('CV written you lazy bum!');
    }
  );
};

module.exports = writeTxt;
