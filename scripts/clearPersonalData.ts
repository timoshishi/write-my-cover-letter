import { writeJSONToDisk } from '../src/utils';

(async () => {
  await writeJSONToDisk('personalIntro', { personalIntro: '' }, 'cvPersonalization');
  await writeJSONToDisk('contactInfo', { name: '', email: '', phone: '', sites: [] }, 'cvPersonalization');
  await writeJSONToDisk('roles', {}, 'cvPersonalization');
})();

export default {};
