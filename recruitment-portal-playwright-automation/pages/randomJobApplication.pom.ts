import { Locator, Page } from '@playwright/test';
import { JobApplicationFormData } from '../utils/candidateDataGenerator';
import { generateRandomData } from '../utils/publicJobApply_dataUtils';
import dotenv from 'dotenv';
dotenv.config();

export class RandomJobApplicationFromPublicSitePage {
    private randomJobApplicationPageUrl: string;
    private applyFortheJob: Locator;
    private uploadImageButton: Locator;
    private uploadResumeButton: Locator;
    private clickPrivacyPolicy: Locator;
    private reviewButton: Locator;
    private submitButton: Locator;
    private successfulReview: Locator;
    private okButton: Locator;

    constructor(private page: Page) {
        this.randomJobApplicationPageUrl = process.env.RANDOM_JOB_APPLY_URL as string;
        this.applyFortheJob = this.page.getByRole('link', { name: 'Apply Now' });
        this.uploadImageButton = this.page.getByText('400 x 400');
        this.uploadResumeButton = this.page.getByText('Drag or Upload Your Resume/CV (pdf)');
        this.clickPrivacyPolicy = this.page.getByLabel('I agree with the privacy');
        this.reviewButton = this.page.getByRole('button', { name: 'Review' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.successfulReview = this.page.getByText('Thank you for applying');
        this.okButton = this.page.getByRole('button', { name: 'OK' });
    }

    // Navigates to the job application page
    public async navigateToRandomJobApplicationPage(): Promise<void> {
        await this.page.goto(this.randomJobApplicationPageUrl);
        await this.applyFortheJob.click();
    }

    // Uploads the candidate's image
    public async uploadImage(imageFilePath: string): Promise<void> {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadImageButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imageFilePath);
        await this.okButton.click();
    }

    // Uploads the candidate's resume
    public async uploadResume(resumeFilePath: string): Promise<void> {
        const fileChooserPromisePdf = this.page.waitForEvent('filechooser');
        await this.uploadResumeButton.click();
        const fileChooserPdf = await fileChooserPromisePdf;
        await fileChooserPdf.setFiles(resumeFilePath);
    }

    // Fills the job application form and returns experience data
    public async fillJobApplicationForm(data: JobApplicationFormData): Promise<Map<string, string>> {
        const randomDataVerification = new Map<string, string>();

        await this.page.getByRole('textbox', { name: 'Full Name *' }).fill(data.fullName);
        await this.page.getByRole('textbox', { name: 'Reference (If you\'re referred by any Cefalo employee)' }).fill(data.referredBy);
        await this.page.getByRole('textbox', { name: 'Phone ' }).fill(data.phoneNumber);
        await this.page.getByRole('textbox', { name: 'E-mail Address *' }).fill(data.email);
        await this.page.getByRole('textbox', { name: 'Residential Address *' }).fill(data.residentialAddress);
        await this.page.getByRole('textbox', { name: 'Current/Last Employer *' }).fill(data.currentOrLastEmployer);
        await this.page.getByRole('spinbutton', { name: 'Notice Period of Current Employer *' }).fill(data.noticePeriod);
        await this.page.getByRole('spinbutton', { name: 'Expected Salary *' }).fill(data.expectedSalary);
        await this.page.getByRole('spinbutton', { name: 'Total Experience *' }).fill(data.totalExperience);

        for (const skill of data.primarySkills) {
            await this.page.locator('.ant-select-selection-overflow').first().click();
            await this.page.locator('#rc_select_7').fill(skill);
            await this.page.getByTitle(skill, { exact: true }).click();
        }

        for (const skill of data.secondarySkills) {
            await this.page.locator('.ant-select-selection-overflow').nth(1).click();
            await this.page.locator('#rc_select_8').fill(skill);
            await this.page.getByText(skill).nth(2).click();
        }

        // Store professional experience fields
        const experienceFields = this.page.locator('input[placeholder*="Experience in"]');
        const experienceCount = await experienceFields.count();

        for (let i = 0; i < experienceCount; i++) {
            const fieldLabel = await experienceFields.nth(i).getAttribute('placeholder');
            const experienceValue = generateRandomData(fieldLabel || '');
            await experienceFields.nth(i).fill(experienceValue);
            randomDataVerification.set(fieldLabel || 'Unknown', experienceValue);
        }

        // Fill custom questions if any
        const questionFields = this.page.locator('input[placeholder="Give answer"]');
        const questionCount = await questionFields.count();

        for (let i = 0; i < questionCount; i++) {
            const fieldLabel = await questionFields.nth(i).getAttribute('aria-label');
            const answerValue = generateRandomData(fieldLabel || '');
            await questionFields.nth(i).fill(answerValue);
            randomDataVerification.set(`Testing Question ${i + 1}`, answerValue);
        }

        await this.page.getByLabel('LinkedIn URL').fill(data.randomLinkedInURL);
        await this.page.getByLabel('Github/Bitbucket/Gitlab URL').fill(data.randomGitURL);
        await this.page.getByLabel('StackOverflow URL').fill(data.randomStackOverflowURL);
        await this.page.getByRole('button', { name: 'plus Add' }).click();
        await this.page.getByLabel('Other URL').fill(data.randomOtherURL);
        await this.page.locator('#candidate-create_university_id').fill(data.universityName);
        await this.page.getByText(data.universityName).click();
        await this.page.getByRole('textbox', { name: 'Degree (Bachelors or Equivalent) *' }).fill(data.degree);
        await this.page.getByRole('combobox', { name: 'Passing Year (Bachelors or Equivalent) *' }).fill(data.bachelorPassingYear);
        await this.page.getByTitle(data.bachelorPassingYear).locator('div').click();
        await this.page.getByLabel('Passing Year (HSC or').fill(data.hscPassingYear);
        await this.page.getByTitle(data.hscPassingYear).locator('div').click();
        await this.clickPrivacyPolicy.click();
        await this.reviewButton.click({ timeout: 5000 });

        return randomDataVerification;
    }
}
