const writeDocx = require('./writeDocx');
const writePdf = require('./writePDF');
const writeTxt = require('./writeTxt');
const { generateParagraphs } = require('../letterBody.js');
const deleteDocx = require('./deleteDocx');

const writeFiles = async (options) => {
  const paras = generateParagraphs(options);
  console.log(options);
  const fileWriters = {
    docx: writeDocx,
    pdf: writePdf,
    txt: writeTxt,
  };
  //FIXME: Async behavior leading to files reading and writing in incorrect order
  try {
    await fileWriters.docx(paras);
    options.outputTypes
      .sort((a, b) => b - a)
      .forEach(async (type) => {
        try {
          await fileWriters[type](paras);
        } catch (error) {
          console.error(error);
        }
      });
    if (!options.outputTypes.includes('docx')) {
      deleteDocx(paras.name);
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = writeFiles;
