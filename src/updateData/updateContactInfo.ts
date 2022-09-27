import { writeJSONToDisk } from '../utils';
import inquirer, { Answers } from 'inquirer';
import type { PersonalData } from 'src/types';

export const updateContactInfo =
  (contactInfo: PersonalData['contactInfo']) => async (): Promise<PersonalData['contactInfo'] | void> => {
    try {
      const updatedContactInfo = JSON.parse(JSON.stringify(contactInfo));

      const { sites, ...contact } = contactInfo;
      const contactInfoQuestions = Object.keys(contact).map((field) => ({
        type: 'input',
        name: field,
        message: `What is your ${field}?`,
        default: contact[field],
      }));

      const responses: Answers = await inquirer.prompt(contactInfoQuestions);
      const { shouldUpdateSites } = await inquirer.prompt({
        type: 'confirm',
        name: 'shouldUpdateSites',
        message: 'Would you like to update your links?',
        default: false,
      });
      if (shouldUpdateSites) {
        updatedContactInfo.sites = await addOrDeleteSites(contactInfo.sites);
      }

      const updatedInfo = {
        ...updatedContactInfo,
        name: responses.name,
        email: responses.email,
        phone: responses.phone,
      };
      await writeJSONToDisk('contactInfo', updatedInfo, 'cvPersonalization');
      return updatedInfo;
    } catch (error) {
      console.error(error);
    }
  };

export const addOrDeleteSites = async (sites: string[]): Promise<string[] | void> => {
  let updatedSites = sites;
  const addOrDeleteChoices = [{ name: 'Add a site', value: 'add' }];
  sites.length && addOrDeleteChoices.push({ name: 'Delete a site', value: 'delete' });
  try {
    const { addOrDelete } = await inquirer.prompt([
      {
        type: 'list',
        name: 'addOrDelete',
        message: 'Would you like to delete a site?',
        choices: addOrDeleteChoices,
      },
    ]);

    if (addOrDelete === 'delete') {
      const responses = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'sitesToDelete',
          message: 'Which site would you like to delete?',
          choices: sites.map((site, i) => ({
            name: site,
            value: site,
            type: 'input',
          })),
        },
      ]);

      updatedSites = sites.filter((site) => !responses.sitesToDelete.includes(site));
    }
    if (addOrDelete === 'add') {
      const { newSite } = await inquirer.prompt([
        {
          type: 'input',
          name: 'newSite',
          message: 'What is the url of the new site?',
        },
      ]);
      updatedSites = [...sites, newSite];
    }

    const { shouldContinue } = await inquirer.prompt({
      type: 'confirm',
      name: 'shouldContinue',
      message: 'Would you like to continue editing your sites?',
      default: false,
    });

    if (shouldContinue) {
      return addOrDeleteSites(updatedSites);
    } else {
      return updatedSites;
    }
  } catch (error) {
    console.error(error);
  }
};
