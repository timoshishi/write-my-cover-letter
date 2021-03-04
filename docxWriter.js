const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');

// Create document
const doc = new Document();

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
doc.addSection({
  properties: {},
  children: [
    new Paragraph({
      children: [
        new TextRun('Hello World'),
        new TextRun({
          text: 'Foo Bar',
          bold: true,
        }),
        new TextRun({
          text: '\tGithub is the best',
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun('Hello World'),
        new TextRun({
          text: 'Foo Bar',
        }),
        new TextRun({
          text: '\tGithub is the best',
        }),
      ],
    }),
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('My Document.docx', buffer);
});
