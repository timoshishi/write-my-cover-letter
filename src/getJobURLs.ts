import fs from 'fs';
import path from 'path';
import open from 'open';
import fetch from 'node-fetch';
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
    const prevJobData = fs.readFileSync(path.resolve(__dirname, 'jobURLs', 'hnJobs.json'), 'utf8');
    const { prevJobs } = JSON.parse(prevJobData);
    // debugger;
    const jobsToWrite = jobIds.filter((job: string) => !prevJobs.includes(job));
    return jobsToWrite.length ? jobsToWrite : prevJobs;
  } catch (err) {
    console.error(err);
  }
};

const openJobsInBrowser = async () => {
  try {
    const jobIds = await getNewJobs();
    if (jobIds && jobIds.length) {
      const promises = await jobIds.map((id: string) => {
        return fetch(`${hnURL}/item/${id}.json`)
          .then((res: any) => res.json())
          .then((data: JSON) => {
            return data;
          })
          .catch((err: unknown) => console.error(err));
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
    fs.writeFile(path.resolve(__dirname, 'jobURLs', 'hnJobs.json'), jobs, (err: Error | null) => {
      if (err) {
        return console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
};
const searchJobs = () => {
  writeJobs();
  openJobsInBrowser();
};

export default searchJobs;
