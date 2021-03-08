const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document();

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

const writeDocx = (options) => {
  const {
    contactInfo,
    role,
    aboutMe,
    closer,
    introPara,
    toWhomItMayConcern,
    name,
  } = options;

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
        fs.writeFileSync(
          `${name.split(' ').join('_')}_cover_letter.docx`,
          buffer
        );
        resolve('written');
      })
      .catch((err) => reject(err));
  });
};

module.exports = writeDocx;
