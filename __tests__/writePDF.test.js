const generateParagraphs = require('../src/generateParagraphs');
const writeDocx = require('../src/writeDocs/writeDocx');
const path = require('path');
const fs = require('fs');
const writePDF = require('../src/writeDocs/writePDF');
const readPersonalization = require('../src/readPersonalization');
const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'hello',
  personalData: readPersonalization(),
};
const paras = generateParagraphs(options);

const fileName = `${paras.name.split(' ').join('_')}_cover_letter`;

beforeEach(async () => await writeDocx(paras, __dirname));

afterEach(() => {
  fs.unlink(path.resolve(__dirname, `${fileName}.docx`), (err) => {
    if (err) {
      return fs.unlinkSync(path.resolve(__dirname, `${fileName}.pdf`));
    } else {
      return fs.unlinkSync(path.resolve(__dirname, `${fileName}.pdf`));
    }
  });
});

test('it should write a pdf file with a properly formatted title', () => {
  return writePDF(paras, __dirname).then((un) => {
    const files = fs.readdirSync(path.resolve(__dirname));
    expect(files).toContain(`${fileName}.pdf`);
  });
});
