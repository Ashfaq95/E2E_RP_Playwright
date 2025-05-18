import { Page, Locator } from '@playwright/test';
import { JobApplicationFormData } from '../utils/candidateDataGenerator';
import dotenv from 'dotenv';

dotenv.config();

export class AddCandidatePage {

    private page: Page;
    private userAddButton: Locator;
    private imageUploadButton: Locator;
    private resumeUploadButton: Locator;
    private okButton: Locator;
    private fullNameField: Locator;
    private referenceField: Locator;
    private phoneField: Locator;
    private emailField: Locator;
    private jobSelectDropdown: Locator;
    private jobOptionQA: Locator;
    private addressField: Locator;
    private emailPlaceholder: Locator;
    private lastEmployer: Locator;
    private totalExperience: Locator;
    private noticePeriodField: Locator;
    private salaryField: Locator;
    private professionalExpManual: Locator;
    private professionalExpAutomation: Locator;
    private professionalExpFastAPI: Locator;
    private professionalExpPostman: Locator;
    private universityDropdown: Locator;
    private universityOption: Locator;
    private majorField: Locator;
    private clickPrimarySkills: Locator;
    private fillPrimarySkillsInput: Locator;
    private clickSecondarySkills: Locator;
    private fillSecondarySkillsInput: Locator;
    private bachelorPassingYear: Locator;
    private hscPassingYear: Locator;
    private submitButton: Locator;
    private adminHomePageUrl: string = process.env.ADMIN_HOME_URL as string;

    constructor(page: Page) {
        this.page = page;

        this.userAddButton = this.page.getByRole('button', { name: 'user-add' });
        this.imageUploadButton = this.page.getByText('x 400');
        this.resumeUploadButton = this.page.getByRole('button', { name: 'upload Drag or Upload Your' });
        this.okButton = this.page.getByRole('button', { name: 'OK' });
        this.fullNameField = this.page.getByRole('textbox', { name: 'Full Name *' });
        this.referenceField = this.page.getByRole('textbox', { name: "Reference (If you're referred by any Cefalo employee)" });
        this.phoneField = this.page.getByRole('textbox', { name: 'Phone ' });
        this.emailField = this.page.getByPlaceholder('Mention his/her full name and');
        this.jobSelectDropdown = this.page.locator('#rc_select_7');
        this.jobOptionQA = this.page.getByText('QA Engineer 2');
        this.addressField = this.page.getByPlaceholder('Write your residential');
        this.emailPlaceholder = this.page.getByPlaceholder('example@cefalo.com');
        this.lastEmployer = this.page.getByPlaceholder('Name of your current/last');
        this.noticePeriodField = this.page.getByPlaceholder('Notice period in weeks');
        this.salaryField = this.page.getByPlaceholder('Write in BDT');
        this.totalExperience = this.page.getByPlaceholder('Your professional experience');
        this.clickPrimarySkills = this.page.locator('.ant-select-selection-overflow').first() ;
        this.fillPrimarySkillsInput = this.page.locator('#rc_select_7');
        this.clickSecondarySkills = this.page.locator('.ant-select-selection-overflow').nth(1);
        this.fillSecondarySkillsInput = this.page.locator('#rc_select_3');
        this.professionalExpManual = this.page.getByLabel('Professional Experience in Manual Testing*');
        this.professionalExpAutomation = this.page.getByLabel('Professional Experience in Test Automation*');
        this.professionalExpFastAPI = this.page.getByLabel('Professional Experience in Fast API*');
        this.professionalExpPostman = this.page.getByLabel('Professional Experience in Postman*');
        this.universityDropdown = this.page.locator('#candidate-create_university_id');
        this.universityOption = this.page.getByText('Test University BD');
        this.majorField = this.page.getByPlaceholder('example: CSE,EEE');
        this.bachelorPassingYear = this.page.getByRole('combobox', { name: 'Passing Year (Bachelors or Equivalent) *' });
        this.hscPassingYear = this.page.getByLabel('Passing Year (HSC or');
        this.submitButton = this.page.getByRole('button', { name: 'Submit Now' });
    }

    async navigateToCandidatePage(): Promise<void> {
        await this.page.goto(this.adminHomePageUrl);
    }
    async openApplicationForm(): Promise<void> {
        await this.userAddButton.click();
    }

    async fillCandidatePersonalInformation(data: JobApplicationFormData): Promise<string> {

        await this.fullNameField.fill(data.fullName);
        await this.referenceField.fill(data.referredBy);
        await this.phoneField.fill(data.phoneNumber);
        await this.emailField.fill(data.email);
        await this.jobSelectDropdown.click();
        await this.jobSelectDropdown.fill('QA');
        await this.jobOptionQA.click();
        await this.addressField.fill(data.residentialAddress);
        await this.emailPlaceholder.fill(data.email);
        await this.lastEmployer.fill(data.currentOrLastEmployer);
        await this.noticePeriodField.fill(data.noticePeriod);
        await this.totalExperience.fill(data.totalExperience);
        await this.salaryField.fill(data.expectedSalary);
        await this.professionalExpManual.fill(data.experienceInManualTesting);
        await this.professionalExpAutomation.fill(data.experienceInAutomationTesting);
        await this.professionalExpFastAPI.fill(data.experienceInFastApi);
        await this.professionalExpPostman.fill(data.experienceInPostman);
        await this.universityDropdown.click();
        await this.universityOption.click();
        await this.majorField.fill(data.degree);
        return data.fullName;
    }
    async uploadImage(imageFilePath: string): Promise<void> {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.imageUploadButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imageFilePath);
        await this.okButton.click();
    }

    async uploadResume(resumeFilePath: string): Promise<void> {
        const fileChooserPromisePdf = this.page.waitForEvent('filechooser');
        await this.resumeUploadButton.click();
        const fileChooserPdf = await fileChooserPromisePdf;
        await fileChooserPdf.setFiles(resumeFilePath);
    }
    async fillPrimarySkills(text: string): Promise<void> {
        await this.clickPrimarySkills.click();
        await this.fillPrimarySkillsInput.fill(text);
        const suggestedOption = this.page.getByTitle(text).locator('div');
        await suggestedOption.click();
    }
    async fillSecondarySkills(text: string): Promise<void> {
        await this.clickSecondarySkills.click();
        await this.fillSecondarySkillsInput.fill(text);
        const suggestedSecondarySkillsOption = this.page.getByText(text).nth(2);
        await suggestedSecondarySkillsOption.click();
    }

    async fillBachelorPassingYear(text: string): Promise<void> {
        await this.bachelorPassingYear.fill(text);
        const suggestedBachelorPassingYear = this.page.getByTitle(text);
        await suggestedBachelorPassingYear.click();
    }
    async fillHscPassingYear(text: string): Promise<void> {
        await this.hscPassingYear.fill(text);
        const suggestedHscPassingYear = this.page.getByTitle(text);
        await suggestedHscPassingYear.click();
    }

    async submitApplication(): Promise<void> {
        await this.submitButton.click();
    }
}