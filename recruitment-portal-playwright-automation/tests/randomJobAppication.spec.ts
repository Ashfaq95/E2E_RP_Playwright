import { test, expect } from '@playwright/test';
import { RandomJobApplicationFromPublicSitePage } from '../pages/randomJobApplication.pom';
import { imageFilePath, resumeFilePath } from '../utils/filePaths';
import { generateJobApplicationFormData } from '../utils/candidateDataGenerator';

test('This test will run automaticaly when new jobs gets posted from ATS', async ({ page }) => {
    const randomJobApplication = new RandomJobApplicationFromPublicSitePage(page);
    await randomJobApplication.navigateToRandomJobApplicationPage();
    await expect(randomJobApplication['uploadImageButton']).toBeVisible();
    await randomJobApplication.uploadImage(imageFilePath);
    await randomJobApplication.uploadResume(resumeFilePath);
    await expect(page.getByText('candidateCV.pdf')).toBeVisible();
    const formData = generateJobApplicationFormData();
    // await randomJobApplication.fillJobApplicationForm(formData);
    const experienceData = await randomJobApplication.fillJobApplicationForm(formData);

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

    // Dynamic verification for "Professional experience in" sections
    const experienceSections = page.getByText('Professional experience in');
    const sectionCount = await experienceSections.count();

    for (let i = 0; i < sectionCount; i++) {
        const sectionText = await experienceSections.nth(i).textContent();
        if (sectionText) {
            const regex = /Professional experience in (.+?)\s+(\d+)\s+Years/;
            const match = sectionText.match(regex);

            if (match) {
                const skillName = match[1];
                const years = match[2];
                const expectedValue = experienceData.get(`Professional experience in ${skillName}`);
                await expect.soft(page.getByText(`${skillName} ${years} Years`)).toBeVisible();
                expect.soft(years).toBe(expectedValue);
            }
        }
    }
    await expect.soft(page.getByText(formData.universityName)).toBeVisible();
    await expect.soft(page.getByText(formData.degree)).toBeVisible();
    await expect.soft(page.getByText(formData.bachelorPassingYear)).toBeVisible();
    await expect.soft(page.getByText(formData.hscPassingYear)).toBeVisible();
    await randomJobApplication['submitButton'].click({ timeout: 50000 });
    await expect(randomJobApplication['successfulReview']).toBeVisible();

});