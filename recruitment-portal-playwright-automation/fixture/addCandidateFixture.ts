import { expect } from '@playwright/test';
import { AddCandidatePage } from '../pages/addCandidatePage.pom';
import { generateJobApplicationFormData } from '../utils/candidateDataGenerator';
import { imageFilePath, resumeFilePath } from '../utils/filePaths';
import { test } from './custom_fixture';

export const testWithCandidateWorkflow = test.extend({
  addNewCandidateWorkflow: async ({ authenticatedPage }, use) => {
    const addCandidatePage = new AddCandidatePage(authenticatedPage);

    const addCandidateWorkflow = async () => {

      const candidateData = generateJobApplicationFormData();

      await addCandidatePage.navigateToCandidatePage();
      await addCandidatePage.openApplicationForm();
      await addCandidatePage.uploadImage(imageFilePath);
      await expect(authenticatedPage.getByText('Image uploaded successfully!')).toBeVisible();
      await addCandidatePage.uploadResume(resumeFilePath);
      await expect(authenticatedPage.getByText('Resume uploaded successfully!')).toBeVisible();

      await addCandidatePage.fillCandidatePersonalInformation(candidateData);
      await addCandidatePage.fillBachelorPassingYear('2023');
      await addCandidatePage.fillHscPassingYear('2020');

      const primarySkills = ['Android Apps', 'Flutter', 'AWS'];
      for (const skill of primarySkills) {
        await addCandidatePage.fillPrimarySkills(skill);
      }


      // await page.locator('.ant-select-selection-overflow').first().click();
      // await page.locator('#rc_select_7').fill('Android Apps');
      // await page.getByTitle('Android Apps').locator('div').click();

      const secondarySkills = ['Data Engineering', 'Big Data', 'Dart'];
      for (const skill of secondarySkills) {
        await addCandidatePage.fillSecondarySkills(skill);
      }

      await addCandidatePage.submitApplication();
      await expect(authenticatedPage.getByText('Candidate successfully applied')).toBeVisible();

      return candidateData.fullName;
    };

    await use(addCandidateWorkflow);
  },
});
