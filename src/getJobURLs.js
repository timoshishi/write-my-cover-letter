const open = require('open');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const hnURL = 'https://hacker-news.firebaseio.com/v0';

const getJobIds = async () => {
  try {
    const res = await fetch(`${hnURL}/jobstories.json`);
    const data = await res.json();

    return data.slice(0, 10);
  } catch (err) {
    console.error(err);
  }
};

const getNewJobs = async () => {
  try {
    const jobIds = await getJobIds();
    const prevJobData = fs.readFileSync(
      path.resolve(__dirname, 'jobURLs', 'hnJobs.json')
    );
    const { prevJobs } = JSON.parse(prevJobData);
    // debugger;
    const jobsToWrite = jobIds.filter((job) => !prevJobs.includes(job));
    return jobsToWrite.length ? jobsToWrite : prevJobs;
  } catch (err) {
    console.error(err);
  }
};

const openJobsInBrowser = async () => {
  try {
    const jobIds = await getNewJobs();
    if (jobIds && jobIds.length) {
      const promises = await jobIds.map((id) => {
        return fetch(`${hnURL}/item/${id}.json`)
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((err) => console.error(err));
      });
      const jobs = await Promise.all(promises);
      jobs.map((job) => job?.url && open(job.url));
    }
  } catch (err) {
    console.error(err);
  }
};

const writeJobs = async () => {
  try {
    const jobIds = await getNewJobs();
    const jobs = JSON.stringify({ prevJobs: jobIds });
    fs.writeFile(
      path.resolve(__dirname, 'jobURLs', 'hnJobs.json'),
      jobs,
      (err) => {
        if (err) {
          return console.error(err);
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
const searchJobs = () => {
  writeJobs();
  openJobsInBrowser();
};

module.exports = searchJobs;
