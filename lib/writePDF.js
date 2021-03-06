const libre = require('libreoffice-convert');

const path = require('path');
const fs = require('fs');

const writePDF = ({ name }) => {
  const formattedName = name.split(' ').join('_');
  const extend = '.pdf';
  const enterPath = `${formattedName}_CV.docx`;

  const outputPath = `${formattedName}_CV.pdf`;

  // Read file
  const file = fs.readFileSync(enterPath);
  // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
  libre.convert(file, extend, undefined, (err, done) => {
    if (err) {
      console.log(`Error converting file: ${err}`);
    }

    // Here in done you have pdf file which you can save or transfer in another stream
    fs.writeFileSync(outputPath, done);
    fs.unlinkSync(enterPath);
  });
};

module.exports = writePDF;
