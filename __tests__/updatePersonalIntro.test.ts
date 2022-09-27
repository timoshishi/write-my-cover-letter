import { updatePersonalIntro } from '../src/updateData/updatePersonalIntro';
import inquirer from 'inquirer';

describe('updatePersonalIntro', () => {
  let spy;
  let writeJSONSpy;

  beforeEach(() => {
    spy = jest.spyOn(inquirer, 'prompt');
    writeJSONSpy = jest.spyOn(require('../src/utils'), 'writeJSONToDisk').mockResolvedValue(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the personalIntro', async () => {
    spy.mockResolvedValueOnce({ personalIntro: 'Hello, my name is...' });

    const results = await updatePersonalIntro('here is an intro');
    expect(writeJSONSpy).toHaveBeenCalledWith(
      'personalIntro',
      { personalIntro: 'Hello, my name is...' },
      'cvPersonalization'
    );
    expect(results).toEqual({ personalIntro: 'Hello, my name is...' });
  });
});
