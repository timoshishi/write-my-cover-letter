const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const doc = new Document();

const createDocxParagraph = (text, options) => {
  return new Paragraph({
    children: [new TextRun({ text, ...options })],
  });
};

const writeDocx = (options, path = '') => {
  const {
    contactInfo,
    roleStr,
    aboutMe,
    closer,
    introPara,
    toWhomItMayConcern,
    name,
    defaultStyles,
    copy,
    company,
  } = options;

  const BASE_PATH = `${path.length ? `${path}/` : ''}`;
  const formattedName = `${name.split(' ').join('_')}_cover_letter.docx`;
  const formattedCompany = `${company.split(' ').join('_')}.docx`;
  doc.addSection({
    properties: {},
    children: [
      createDocxParagraph(toWhomItMayConcern, defaultStyles),
      createDocxParagraph(introPara, { ...defaultStyles }),
      createDocxParagraph(aboutMe, { ...defaultStyles, break: 1 }),
      createDocxParagraph(roleStr, { ...defaultStyles, break: 1 }),
      createDocxParagraph(closer, { ...defaultStyles, break: 1 }),
      createDocxParagraph('Best Wishes,', { ...defaultStyles, break: 1 }),
      createDocxParagraph(name, defaultStyles),
      createDocxParagraph(contactInfo, defaultStyles),
    ],
  });

  return new Promise((resolve, reject) => {
    Packer.toBuffer(doc)
      .then((buffer) => {
        fs.writeFileSync(`${BASE_PATH}${formattedName}`, buffer);
        if (copy) {
          fs.writeFileSync(`${BASE_PATH}${formattedCompany}`, buffer);
        }
        resolve('written');
      })
      .catch((err) => reject(err));
  });
};

module.exports = writeDocx;
