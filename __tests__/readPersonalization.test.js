const fs = require('fs');
const path = require('path');
const readPersonalization = require('../src/readPersonalization');

test('It should return one object per file in cvPersonalization', () => {
  const fileNames = fs.readdirSync(
    path.resolve(__dirname, 'cvPersonalization')
  );
  const personalData = readPersonalization();
  expect(Object.keys(personalData).length).toEqual(fileNames.length);
});
