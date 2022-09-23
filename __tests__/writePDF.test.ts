import { generateParagraphs } from '../src/generateParagraphs';
import writeDocx from '../src/writeDocs/writeDocx';
import readPersonalization from '../src/readPersonalization';
import { Options } from '../src/types';
import writePDF from '../src/writeDocs/writePDF';
import fs from 'fs';
import path from 'path';
const options = {
  industry: 'generic',
  company: 'RED ALERT',
  position: 'FULL STACK',
  role: 'frontend',
  intro: 'Here is a thing that I have been doing lately',
  contact: 'hello',
  personalData: readPersonalization(),
} as unknown as Options;
const paras = generateParagraphs(options);

const fileName = `${paras.name.split(' ').join('_')}_cover_letter`;

beforeEach(async () => await writeDocx(paras as any, __dirname));

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
  return writePDF(paras as any, __dirname).then((un) => {
    const files = fs.readdirSync(path.resolve(__dirname));
    expect(files).toContain(`${fileName}.pdf`);
  });
});
