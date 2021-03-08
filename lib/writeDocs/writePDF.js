const libre = require('libreoffice-convert');
const fs = require('fs');

const writePDF = ({ name }) => {
  return new Promise((resolve, reject) => {
    const formattedName = name.split(' ').join('_');
    const enterPath = `${formattedName}_cover_letter.docx`;
    const extend = '.pdf';
    const outputPath = `${formattedName}_cover_letter.pdf`;

    const file = fs.readFileSync(enterPath);

    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        reject(err);
      }
      fs.writeFileSync(outputPath, done);
      // fs.unlink(enterPath, (err) => err && console.error(err));
      resolve('written');
    });
  });
};

module.exports = writePDF;
