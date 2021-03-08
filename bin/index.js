#!/usr/bin/env node

// const initCommander = require('../lib/initCommander.js');
const { generateParagraphs } = require('../lib/letterBody.js');
// const writeTxt = require('../lib/writeTxt.js');
// const writeDocx = require('../lib/writeDocs/writeDocx');
// const writePDF = require('../lib/writeDocs/writePDF.js');
const initInquirer = require('../lib/initInquirer.js');

// const options = initCommander();
initInquirer();
// const paras = generateParagraphs(options);

// if (options.debug) console.log(options);

// if (options.txt && !options.docx) {
//   writeTxt(paras);
//   console.log('txt written');
// } else if (options.pdf) {
//   writeDocx(paras)
//     .then((un) => {
//       writePDF(options);
//       console.log('pdf written');
//     })
//     .catch((err) => console.error(err));
// } else if (options.docx) {
//   writeDocx(paras)
//     .then((un) => console.log('docx written'))
//     .catch((err) => console.error(err));
// }
