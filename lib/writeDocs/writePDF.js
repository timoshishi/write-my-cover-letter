const libre = require('libreoffice-convert');
const fs = require('fs');

const writePDF = ({ name }, path = '') => {
  const FILE_PATH = `${path.length ? `${path}/` : ''}${name
    .split(' ')
    .join('_')}_cover_letter.pdf`;

  return new Promise((resolve, reject) => {
    const formattedName = name.split(' ').join('_');
    const enterPath = `${formattedName}_cover_letter.docx`;
    const extend = '.pdf';

    const file = fs.readFileSync(enterPath);

    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        reject(err);
      }
      fs.writeFileSync(FILE_PATH, done);
      resolve('pdf written');
    });
  });
};

module.exports = writePDF;
