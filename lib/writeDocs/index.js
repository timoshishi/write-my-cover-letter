const writeDocx = require('./writeDocx');
const writePdf = require('./writePDF');
const writeTxt = require('./writeTxt');
const { generateParagraphs } = require('../letterBody.js');

const writeFiles = async (options) => {
  const paras = generateParagraphs(options);
  const fileWriters = {
    docx: writeDocx,
    pdf: writePdf,
    txt: writeTxt,
  };
  options.outputTypes.forEach(async (type) => {
    try {
      await fileWriters[type](paras);
      console.log('written');
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = writeFiles;
