import { createHeader } from '../src/createHeader';
import figlet from 'figlet';
jest.spyOn(console, 'log').mockImplementation(() => {});
describe('createHeader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a promise with a string', async () => {
    const header = await createHeader();
    expect(typeof header).toBe('string');
  });

  it('rejects if figlet is not found', async () => {
    jest.spyOn(figlet, 'text').mockImplementation((text, options, callback) => {
      callback(new Error('figlet not found'));
    });
    expect(createHeader()).rejects.toThrow();
  });
});
