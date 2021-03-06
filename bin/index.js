#!/usr/bin/env node

const initCommander = require('../lib/initCommander.js');
const { generateParagraphs } = require('../lib/letterBody.js');
const writeTxt = require('../lib/writeTxt.js');
const writeDocx = require('../lib/writeDocx');
const writePDF = require('../lib/writePDF.js');

const options = initCommander();
const paras = generateParagraphs(options);

if (options.debug) console.log(options);

if (options.txt && !options.docx) {
  writeTxt(paras);
  console.log('txt written');
} else if (options.pdf) {
  writeDocx(paras)
    .then((un) => {
      writePDF(options);
      console.log('pdf written');
    })
    .catch((err) => console.error(err));
} else if (options.docx) {
  writeDocx(paras)
    .then((un) => console.log('docx written'))
    .catch((err) => console.error(err));
}
