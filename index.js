const { options } = require('./initCommander.js');
const { generateParagraphs } = require('./letterBody.js');
const writeTxt = require('./writeTxt.js');
const writeDocx = require('./writeDocx');

const paras = generateParagraphs(options);

if (options.debug) console.log(options);
if (options.txt) writeTxt(paras);
if (options.docx) writeDocx(paras);
