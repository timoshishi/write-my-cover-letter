const generateParagraphs = require('../lib/generateParagraphs');
const writeDocx = require('../lib/writeDocs/writeDocx');
const path = require('path');
const fs = require('fs');

const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'yello',
};
const paras = generateParagraphs(options);

const fileName = `${paras.name.split(' ').join('_')}_cover_letter.docx`;
// afterEach(() => {

// })
afterEach(() => {
  fs.unlinkSync(path.resolve(__dirname, `${fileName}`));
});

test('it should write a file to disk', () => {
  const beforeWrite = fs.readdirSync(path.resolve(__dirname));
  return writeDocx(paras, __dirname).then((un) => {
    const afterWrite = fs.readdirSync(path.resolve(__dirname));
    expect(afterWrite.length).toBe(beforeWrite.length + 1);
  });
});

test('it should write a docx file with a properly formatted title', () => {
  return writeDocx(paras, __dirname).then((un) => {
    const files = fs.readdirSync(path.resolve(__dirname));
    expect(files).toContain(fileName);
  });
});
