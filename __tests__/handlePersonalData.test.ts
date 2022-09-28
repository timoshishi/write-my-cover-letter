import { checkIfShouldUpdate } from '../src/checkIfShouldUpdate';
import inquirer from 'inquirer';

describe('checkIfShouldUpdate', () => {
  it('should return true if the data is different', async () => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValue({ shouldUpdate: true });
    const result = await checkIfShouldUpdate();
    expect(result).toEqual(true);
  });

  it('should return false if the data is the same', async () => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValue({ shouldUpdate: false });
    const result = await checkIfShouldUpdate();
    expect(result).toEqual(false);
  });
});
