const writeDocx = require('./writeDocx');
const writePdf = require('./writePDF');
const writeTxt = require('./writeTxt');
const { generateParagraphs } = require('../letterBody.js');
const deleteDocx = require('./deleteDocx');

const writeFiles = async (options) => {
  const paras = generateParagraphs(options);
  console.log(options);

  //FIXME: Async behavior leading to files reading and writing in incorrect order
  try {
    await writeDocx(paras);
    if (options.outputTypes.includes('pdf')) {
      await writePdf(paras);
    }
    if (!options.outputTypes.includes('docx')) {
      deleteDocx(paras.name);
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = writeFiles;
