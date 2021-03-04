const fs = require('fs');
const { generateParagraphs } = require('./letterBody.js');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document();

const { options } = require('./initCommander.js');
if (options.debug) console.log(options);

const {
  contactInfo,
  role,
  aboutMe,
  closer,
  introPara,
  toWhomItMayConcern,
} = generateParagraphs(options);

// GENERATE .txt
const cv = [];
const generateParagraph = (...args) => `${args.join(' ')}\n`;
cv.push(toWhomItMayConcern);
cv.push(generateParagraph(introPara));
cv.push(generateParagraph(aboutMe));
cv.push(generateParagraph(role));
cv.push(generateParagraph(closer));
cv.push(
  `BestWishes,
  ${options.name}
  ${contactInfo}`
);

const stylingOptions = {
  size: 22,
  style: 'wellSpaced',
  font: 'Arial',
};
//GENERATE .docx
const createDocxParagraph = (text, options) => {
  return new Paragraph({
    children: [new TextRun({ text, ...options })],
  });
};
doc.addSection({
  properties: {},
  children: [
    createDocxParagraph(toWhomItMayConcern, stylingOptions),
    createDocxParagraph(introPara, { ...stylingOptions, break: 1 }),
    createDocxParagraph(aboutMe, { ...stylingOptions, break: 1 }),
    createDocxParagraph(role, { ...stylingOptions, break: 1 }),
    createDocxParagraph(closer, { ...stylingOptions, break: 1 }),
    createDocxParagraph('Best Wishes,', { ...stylingOptions, break: 1 }),
    createDocxParagraph(options.name, stylingOptions),
    createDocxParagraph(contactInfo, stylingOptions),
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(`${options.name.split(' ').join('_')}_CV.docx`, buffer);
});

fs.writeFile(
  `${options.name.split(' ').join('_')}_CV.txt`,
  cv.join('\n'),
  'utf8',
  function (err) {
    if (err) return console.log(err);
    console.log('CV written you lazy bum!');
  }
);
