import { logHeader } from './logHeader';
import { writeCoverLetter } from './writeDocs/writeCoverLetter';
import { handlePersonalData } from './handlePersonalData';
import { handleCoverLetterData } from './handleCoverLetterData';
import { createKeypressStream } from './createKeypressStream';
import { handleComplete } from './handleComplete';

const initInquirer = async () => {
  try {
    logHeader();

    const keysPressed = createKeypressStream(process);

    const personalData = await handlePersonalData();

    const { textResponses, outputTypes, createCopy } = await handleCoverLetterData(personalData);
    console.log('BEFORE WRITE');
    await writeCoverLetter({ textResponses, outputTypes, createCopy, personalData });
    console.log('WRITTEN');
    await handleComplete({
      personalDataUsed: personalData,
      keysPressed,
    });
    console.log('DONE');

    return 'files written';
  } catch (err) {
    console.error(err);
    console.log("WE HAVE FAILED YOU! WE'RE SORRY!");
    process.exit(1);
  }
};

export default initInquirer;
