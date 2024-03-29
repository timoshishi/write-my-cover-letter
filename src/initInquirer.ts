import { logHeader } from './createHeader';
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

    await writeCoverLetter({ textResponses, outputTypes, createCopy, personalData });

    await handleComplete({
      personalDataUsed: personalData,
      keysPressed,
    });

    return 'files written';
  } catch (err) {
    console.error(err);
    console.log("WE HAVE FAILED YOU! WE'RE SORRY!");
    process.exit(1);
  }
};

export default initInquirer;
