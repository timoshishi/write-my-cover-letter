const writeDocx = require('./writeDocx');
const writePdf = require('./writePDF');
const generateParagraphs = require('../generateParagraphs.js');
const deleteDocx = require('./deleteDocx');

const writeFiles = async (options) => {
  const paras = generateParagraphs(options);
  try {
    await writeDocx(paras);
    if (options.outputTypes.includes('pdf')) {
      await writePdf(paras);
    }
    if (!options.outputTypes.includes('docx')) {
      deleteDocx(paras.name);
    }
    console.log('Cover Letter Written!');
  } catch (err) {
    console.error(err);
  }
};
module.exports = writeFiles;
