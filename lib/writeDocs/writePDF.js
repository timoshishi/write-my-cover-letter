const libre = require('libreoffice-convert');
const fs = require('fs');

const writePDF = ({ name, company, copy }, path = '') => {
  const FILE_PATH = `${path.length ? `${path}/` : ''}`;

  return new Promise((resolve, reject) => {
    const formattedCompany = `${company.split(' ').join('_')}_cover_letter.pdf`;
    const formattedName = `${name.split(' ').join('_')}_cover_letter.pdf`;
    const enterPath = `${name.split(' ').join('_')}_cover_letter.docx`;
    const extend = '.pdf';

    const file = fs.readFileSync(enterPath);

    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        reject(err);
      }
      fs.writeFileSync(`${FILE_PATH}${formattedName}`, done);
      if (copy) {
        fs.writeFileSync(`${FILE_PATH}${formattedCompany}`, done);
      }
      resolve('pdf written');
    });
  });
};

module.exports = writePDF;
