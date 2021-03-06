#!/usr/bin/env node

const initCommander = require('../lib/initCommander.js');
const { generateParagraphs } = require('../lib/letterBody.js');
const writeTxt = require('../lib/writeTxt.js');
const writeDocx = require('../lib/writeDocx');

const options = initCommander();
const paras = generateParagraphs(options);

if (options.debug) console.log(options);

if (options.txt && !options.docx) {
  writeTxt(paras);
} else {
  writeDocx(paras);
}
