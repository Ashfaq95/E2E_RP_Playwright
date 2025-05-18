import { expect } from '@playwright/test';
import { test } from '../fixture/custom_fixture';
import { imageFilePath, resumeFilePath } from '../utils/filePaths';
import { generateJobApplicationFormData } from '../utils/candidateDataGenerator';

let candidateName1: string;

test('User should be able to schedule an interview and evaluate candidate', async ({ addCandidate, candidateProfile, authenticatedPage }) => {
    await candidateProfile.navigateToHomePage()
    await addCandidate.openApplicationForm();
    await addCandidate.uploadImage(imageFilePath);
    await expect(authenticatedPage.getByText('Image uploaded successfully!')).toBeVisible();
    await addCandidate.uploadResume(resumeFilePath);
    await expect(authenticatedPage.getByText('Resume uploaded successfully!')).toBeVisible();
    await expect(authenticatedPage.getByText('candidateCV.pdf')).toBeVisible();
    const candidateData = generateJobApplicationFormData();


    candidateName1 = await addCandidate.fillCandidatePersonalInformation(candidateData);
    await addCandidate.fillBachelorPassingYear('2023');
    await addCandidate.fillHscPassingYear('2020');

    const primarySkills = ['Android Apps', 'Flutter', 'AWS'];
    for (const skill of primarySkills) {
        await addCandidate.fillPrimarySkills(skill);
    }

    const secondarySkills = ['Data Engineering', 'Big Data', 'Dart'];
    for (const skill of secondarySkills) {
        await addCandidate.fillSecondarySkills(skill);
    }
    
    await addCandidate.submitApplication();
    await expect(authenticatedPage.getByText('Candidate successfully applied')).toBeVisible();
    await candidateProfile.selectCandidate(candidateName1);
    await candidateProfile.setInterview('Azman');
    await candidateProfile.evaluateCandidate();
});