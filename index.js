const initCommander = require('./initCommander.js');
const { generateParagraphs } = require('./letterBody.js');
const writeTxt = require('./writeTxt.js');
const writeDocx = require('./writeDocx');

const options = initCommander();
const paras = generateParagraphs(options);

if (options.debug) console.log(options);

if (options.txt && !options.docx) {
  writeTxt(paras);
} else {
  writeDocx(paras);
}
