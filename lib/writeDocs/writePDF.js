const libre = require('libreoffice-convert');
const fs = require('fs');

const writePDF = ({ name }) => {
  const formattedName = name.split(' ').join('_');
  const extend = '.pdf';
  const enterPath = `${formattedName}_CV.docx`;

  const outputPath = `${formattedName}_CV.pdf`;

  const file = fs.readFileSync(enterPath);

  libre.convert(file, extend, undefined, (err, done) => {
    if (err) {
      console.log(`Error converting file: ${err}`);
    }
    fs.writeFileSync(outputPath, done);
    fs.unlinkSync(enterPath);
  });
};

module.exports = writePDF;
