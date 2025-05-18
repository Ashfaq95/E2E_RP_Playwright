import { test, expect } from '@playwright/test';
import { CareerHomePage } from '../pages/careerHomePage.pom';
import { JobDescriptionPage } from '../pages/jobDescription.pom';
import { ApplyForJobPage } from '../pages/applyForJob.pom';
import { imageFilePath, resumeFilePath } from '../utils/filePaths';
import { generateJobApplicationFormData } from '../utils/candidateDataGenerator';

test('Search a job by position from the Current Openings page', async ({ page }) => {
  const careerPage = new CareerHomePage(page);
  await careerPage.navigateToBaseUrl();
  await careerPage.searchJobFromCurrentOpeningsPage('QA Engineer 2');
  await expect(careerPage['applicationDeadlineLabel']).toBeVisible();
});

test('User should be able to apply for the job from the Job description page', async ({ page }) => {
  const jobDesPage = new JobDescriptionPage(page);
  await page.goto(jobDesPage.getJobDescriptionPageUrl());
  await jobDesPage.clickapplyFortheJob();
  const applyForJob = new ApplyForJobPage(page);
  await expect(applyForJob['uploadImageButton']).toBeVisible();
});

test('Apply for the job from the public site with valid inputs', async ({ page }) => {
  const applyForJob = new ApplyForJobPage(page);
  await page.goto(applyForJob.navigateToApplyForJobPage());
  await applyForJob.uploadImage(imageFilePath);
  await applyForJob.uploadResume(resumeFilePath);
  await expect(page.getByText('candidateCV.pdf')).toBeVisible();

  const formData = generateJobApplicationFormData();
  await applyForJob.fillJobApplicationForm(formData);

  const isNavigateToReviewSuccessful = await applyForJob['submitButton'].isVisible();
  expect(isNavigateToReviewSuccessful).toBe(true);

  await expect.soft(page.getByText(formData.fullName)).toBeVisible();
  await expect.soft(page.getByText(formData.referredBy)).toBeVisible();
  await expect.soft(page.getByText(formData.email)).toBeVisible();
  await expect.soft(page.getByText(formData.residentialAddress)).toBeVisible();


  for (const skill of formData.primarySkills) {
    await expect.soft(page.getByText(skill, { exact: true })).toBeVisible();
  }
  for (const skill of formData.secondarySkills) {
    await expect.soft(page.getByText(skill)).toBeVisible();
  }
  await expect.soft(page.getByText(formData.randomLinkedInURL)).toBeVisible();
  await expect.soft(page.getByText(formData.randomGitURL)).toBeVisible();
  await expect.soft(page.getByText(formData.randomStackOverflowURL)).toBeVisible();
  await expect.soft(page.getByText(formData.randomOtherURL)).toBeVisible();

  await expect.soft(page.getByText(formData.universityName)).toBeVisible();
  await expect.soft(page.getByText(formData.degree)).toBeVisible();
  await expect.soft(page.getByText(formData.bachelorPassingYear)).toBeVisible();
  await expect.soft(page.getByText(formData.hscPassingYear)).toBeVisible();
  // await applyForJob['submitButton'].click({ timeout: 50000 });

  const currentUrl = page.url();

  if (currentUrl.includes('ats.cefalolab.com')) {
    await applyForJob['submitButton'].click({ timeout: 50000 });
  } else if (currentUrl.includes('www.career.cefalolab.com')) {
    const isCaptchaPresent = await page.locator('iframe[src*="recaptcha"]').isVisible();
  }
});


