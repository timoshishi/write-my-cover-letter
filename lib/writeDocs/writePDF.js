const libre = require('libreoffice-convert');
const fs = require('fs');

const writePDF = ({ name }) => {
  return new Promise((resolve, reject) => {
    const formattedName = name.split(' ').join('_');
    const enterPath = `${formattedName}_cover_letter.docx`;
    const outputPath = `${formattedName}_cover_letter.pdf`;
    const extend = '.pdf';

    const file = fs.readFileSync(enterPath);

    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        reject(err);
      }
      fs.writeFileSync(outputPath, done);
      resolve('pdf written');
    });
  });
};

module.exports = writePDF;
