const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document();

const DATA_DIR = path.resolve(__dirname, '..', 'cvPersonalization');
const defaultStyles = {
  size: 22,
  style: 'wellSpaced',
  font: 'Arial',
};
const createDocxParagraph = (text, options) => {
  return new Paragraph({
    children: [new TextRun({ text, ...options })],
  });
};

const writeDocx = (options, path = '') => {
  // const defaultStyles = JSON.parse(
  //   fs.readFileSync(path.join(DATA_DIR, 'defaultStyles.json'))
  // );
  console.log({ defaultStyles });
  const {
    contactInfo,
    role,
    aboutMe,
    closer,
    introPara,
    toWhomItMayConcern,
    name,
  } = options;
  const FILE_PATH = `${path.length ? `${path}/` : ''}${name
    .split(' ')
    .join('_')}_cover_letter.docx`;
  doc.addSection({
    properties: {},
    children: [
      createDocxParagraph(toWhomItMayConcern, defaultStyles),
      createDocxParagraph(introPara, { ...defaultStyles }),
      createDocxParagraph(aboutMe, { ...defaultStyles, break: 1 }),
      createDocxParagraph(role, { ...defaultStyles, break: 1 }),
      createDocxParagraph(closer, { ...defaultStyles, break: 1 }),
      createDocxParagraph('Best Wishes,', { ...defaultStyles, break: 1 }),
      createDocxParagraph(name, defaultStyles),
      createDocxParagraph(contactInfo, defaultStyles),
    ],
  });

  return new Promise((resolve, reject) => {
    Packer.toBuffer(doc)
      .then((buffer) => {
        fs.writeFileSync(FILE_PATH, buffer);
        resolve('written');
      })
      .catch((err) => reject(err));
  });
};

module.exports = writeDocx;
