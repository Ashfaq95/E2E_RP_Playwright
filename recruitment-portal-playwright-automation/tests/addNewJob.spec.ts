import { test } from "../fixture/custom_fixture";
import { expect } from '@playwright/test';
import { generateJobData } from "../utils/addNewJobDataGenerator";
import { addNewJobMetaImageFilePath } from '../utils/filePaths';
import { JobsPage } from '../pages/jobs.pom';

let storedJobTitle: string;

test('User adds new job successfully with valid inputs and verify different states of the deleted job', async ({ addNewJobsPage, jobsPage }) => {
  const jobData = generateJobData();
  storedJobTitle = jobData.jobTitle;
  await addNewJobsPage.navigateToAdminHomePage();
  await addNewJobsPage.navigateToJobsPage();
  await addNewJobsPage.clickNewJobButton();
  await addNewJobsPage.fillJobTitleField(jobData.jobTitle);
  await addNewJobsPage.addDeadlineDate();
  await addNewJobsPage.fillJobSummaryField(jobData.jobSummary);
  await addNewJobsPage.fillJobDescriptionField(jobData.jobDescription);

  const skills = ['AWS', 'Data Engineering', 'Big Data'];
  for (const skill of skills) {
    await addNewJobsPage.clickSkillSelector();
    await addNewJobsPage.fillSkillField(skill);
    await addNewJobsPage.selectSkill(skill);
  }

  await addNewJobsPage.fillShortCodeField(jobData.shortCode);
  await addNewJobsPage.fillMetaTitleField(jobData.metaTitle);
  await addNewJobsPage.fillMetaDescriptionField(jobData.metaDescription);
  await addNewJobsPage.fillMetaKeywordsField(jobData.metaKeywords);
  await addNewJobsPage.uploadMetaImage(addNewJobMetaImageFilePath);
  await addNewJobsPage.jobState();
  await addNewJobsPage.saveJob();
  await expect(addNewJobsPage['jobAddSuccessMsg']).toBeVisible();

  await jobsPage.searchJob(storedJobTitle);
  const jobTitleLocator = jobsPage.getJobTitleLocator(storedJobTitle);
  await expect(jobTitleLocator).toBeVisible();
  await addNewJobsPage.deleteJob();

});

