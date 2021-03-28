const generateParagraphs = require('../src/generateParagraphs');
const writeDocx = require('../src/writeDocs/writeDocx');
const path = require('path');
const fs = require('fs');
const readPersonalization = require('../src/readPersonalization');
const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'yello',
  personalData: readPersonalization(),
  copy: false,
  name: 'awesome',
  copy: false,
};
const personalData = readPersonalization();
const paras = generateParagraphs({
  ...options,
});

const fileName = `${paras.name.split(' ').join('_')}_cover_letter.docx`;

afterEach(() => {
  fs.unlinkSync(path.resolve(__dirname, `${fileName}`));
});

test('it should write a file to disk', () => {
  const beforeWrite = fs.readdirSync(path.resolve(__dirname));
  console.log(paras);
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
