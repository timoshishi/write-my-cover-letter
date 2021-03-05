const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document();

const stylingOptions = {
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
      createDocxParagraph(toWhomItMayConcern, stylingOptions),
      createDocxParagraph(introPara, { ...stylingOptions, break: 1 }),
      createDocxParagraph(aboutMe, { ...stylingOptions, break: 1 }),
      createDocxParagraph(role, { ...stylingOptions, break: 1 }),
      createDocxParagraph(closer, { ...stylingOptions, break: 1 }),
      createDocxParagraph('Best Wishes,', { ...stylingOptions, break: 1 }),
      createDocxParagraph(name, stylingOptions),
      createDocxParagraph(contactInfo, stylingOptions),
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`${name.split(' ').join('_')}_CV.docx`, buffer);
    console.log('docx written');
  });
};

module.exports = writeDocx;
