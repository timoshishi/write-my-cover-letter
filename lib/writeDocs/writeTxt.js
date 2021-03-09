const fs = require('fs');

const writeTxt = ({
  contactInfo,
  role,
  aboutMe,
  closer,
  introPara,
  toWhomItMayConcern,
  name,
}) => {
  const cover_letter = [];
  const generateParagraph = (...args) => `${args.join(' ')}\n`;
  cover_letter.push(toWhomItMayConcern);
  cover_letter.push(generateParagraph(introPara));
  cover_letter.push(generateParagraph(aboutMe));
  cover_letter.push(generateParagraph(role));
  cover_letter.push(generateParagraph(closer));
  cover_letter.push(`BestWishes,\n${name}\n${contactInfo}`);
  fs.writeFile(
    `${name.split(' ').join('_')}_cover_letter.txt`,
    cover_letter.join('\n'),
    'utf8',
    function (err) {
      if (err) return err;
      console.log('cover_letter written you lazy bum!');
    }
  );
};

module.exports = writeTxt;
