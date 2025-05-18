import { Locator, Page } from '@playwright/test';
import { JobApplicationFormData } from '../utils/candidateDataGenerator';
import dotenv from 'dotenv';
dotenv.config();

export class ApplyForJobPage {
  private applyForJobPageUrl: string;
  private uploadImageButton: Locator;
  private uploadResumeButton: Locator;
  private clickPrivacyPolicy: Locator;
  private reviewButton: Locator;
  private submitButton: Locator;
  private successfulReview: Locator;
  private okButton: Locator;

  constructor(private page: Page) {
    this.applyForJobPageUrl = process.env.APPLY_FOR_JOB_PAGE_URL as string;
    this.uploadImageButton = this.page.getByText('400 x 400'); // Better locator can be added later
    this.uploadResumeButton = this.page.getByText('Drag or Upload Your Resume/CV (pdf)');
    this.clickPrivacyPolicy = this.page.getByLabel('I agree with the privacy');
    this.reviewButton = this.page.getByRole('button', { name: 'Review' });
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.successfulReview = this.page.getByText('Thank you for applying');
    this.okButton = this.page.getByRole('button', { name: 'OK' });
  }

  public navigateToApplyForJobPage(): string {
    return this.applyForJobPageUrl;
  }

  public async uploadImage(imageFilePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadImageButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(imageFilePath);
    await this.okButton.click();
  }

  public async uploadResume(resumeFilePath: string): Promise<void> {
    const fileChooserPromisePdf = this.page.waitForEvent('filechooser');
    await this.uploadResumeButton.click();
    const fileChooserPdf = await fileChooserPromisePdf;
    await fileChooserPdf.setFiles(resumeFilePath);
  }

  public async fillJobApplicationForm(data: JobApplicationFormData): Promise<void> {
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
      await this.page.locator('#rc_select_1').fill(skill);
      await this.page.getByTitle(skill,{ exact: true }).click();
    }

    for (const skill of data.secondarySkills) {
      await this.page.locator('.ant-select-selection-overflow').nth(1).click();
      await this.page.locator('#rc_select_2').fill(skill);
      await this.page.getByText(skill).nth(2).click();
    }

    await this.page.getByLabel('Professional Experience in Android Apps *').fill(data.experienceInManualTesting);
    await this.page.getByLabel('Professional Experience in C').fill(data.experienceInAutomationTesting);
    await this.page.getByLabel('Professional Experience in Entity Framework *').fill(data.experienceInPostman);
    // await this.page.getByLabel('Professional Experience in Fast API*').fill(data.experienceInFastApi);
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
  }
}