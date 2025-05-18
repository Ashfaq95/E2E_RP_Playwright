import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class AddNewJobsPage {
    private candidateHomePageUrl: string;
    private clickExpandMenu: Locator;
    private clickJobsLabel: Locator;
    private clickNewJobBtn: Locator;
    private fillJobTitle: Locator;
    private clickDeadline: Locator;
    private addDeadline: Locator;
    private fillJobSummary: Locator;
    private fillJobDescription: Locator;
    private clickSkill: Locator;
    private fillSkill: Locator;
    private fillShortCode: Locator;
    private fillMetaTitle: Locator;
    private fillMetaDescription: Locator;
    private fillMetaKeywords: Locator;
    private uploadImageButton: Locator;
    private okButton: Locator;
    private clickJobState: Locator;
    private selectJobState: Locator;
    private clickSaveButton: Locator;
    private jobAddSuccessMsg: Locator;
    private threeDotButton: Locator;
    private deleteJobButton: Locator;
    private okayButton: Locator;

    constructor(private page: Page) {
        this.candidateHomePageUrl = process.env.ADMIN_HOME_URL as string;;
        this.clickExpandMenu = this.page.getByRole('complementary').getByRole('button', { name: 'right' });
        this.clickJobsLabel = this.page.getByRole('link', { name: 'Jobs' });
        this.clickNewJobBtn = this.page.getByRole('button', { name: 'file-add New Job' });
        this.fillJobTitle = this.page.getByPlaceholder('Job title');
        this.clickDeadline = this.page.getByPlaceholder('Select date');
        this.addDeadline = this.page.getByText('Today');
        this.fillJobSummary = this.page.getByPlaceholder('Job summary');
        this.fillJobDescription = this.page.frameLocator('iframe[title="Rich Text Area"]').getByLabel('Rich Text Area');
        this.clickSkill = this.page.locator('.ant-select-selection-overflow');
        this.fillSkill = this.page.getByLabel('Skills');
        this.fillShortCode = this.page.getByPlaceholder('Short code');
        this.fillMetaTitle = this.page.getByPlaceholder('Meta title');
        this.fillMetaDescription = this.page.getByPlaceholder('Meta description');
        this.fillMetaKeywords = this.page.getByPlaceholder('Meta keywords');
        this.uploadImageButton = this.page.getByRole('button', { name: 'upload Click to Upload' });
        this.okButton = this.page.getByRole('button', { name: 'OK' });
        this.clickJobState = this.page.getByLabel('Job State');
        this.selectJobState = this.page.getByText('Published', { exact: true });
        this.clickSaveButton = this.page.getByRole('button', { name: 'Save' });
        this.jobAddSuccessMsg = this.page.getByText('Job is added');
        this.threeDotButton = this.page.locator('.ant-table-cell > .ant-dropdown-trigger').first();
        this.deleteJobButton = this.page.getByText('Delete');
        this.okayButton = this.page.getByRole('button', { name: 'OK' });
    }

    public async navigateToJobsPage(): Promise<void> {
        await this.clickExpandMenu.click();
        await this.clickJobsLabel.click();
    }

    public async clickNewJobButton(): Promise<void> {
        await this.clickNewJobBtn.click();
    }
    public async fillJobTitleField(jobTitle: string): Promise<void> {
        await this.fillJobTitle.fill(jobTitle);
    }
    public async addDeadlineDate(): Promise<void> {
        await this.clickDeadline.click();
        await this.addDeadline.click();
    }
    public async fillJobSummaryField(jobSummary: string): Promise<void> {
        await this.fillJobSummary.fill(jobSummary);
    }
    public async fillJobDescriptionField(jobDescription: string): Promise<void> {
        await this.fillJobDescription.fill(jobDescription);
    }
    public async clickSkillSelector(): Promise<void> {
        await this.clickSkill.click();
    }
    public async fillSkillField(skill: string): Promise<void> {
        await this.fillSkill.fill(skill);
    }
    public async fillShortCodeField(shortCode: string): Promise<void> {
        await this.fillShortCode.fill(shortCode);
    }
    public async fillMetaTitleField(metaTitle: string): Promise<void> {
        await this.fillMetaTitle.fill(metaTitle);
    }
    public async fillMetaDescriptionField(metaDescription: string): Promise<void> {
        await this.fillMetaDescription.fill(metaDescription);
    }
    public async fillMetaKeywordsField(metaKeywords: string): Promise<void> {
        await this.fillMetaKeywords.fill(metaKeywords);
    }

    public async uploadMetaImage(addNewJobMetaImageFilePath: string): Promise<void> {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadImageButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(addNewJobMetaImageFilePath);
        await this.okButton.click();
    }

    public async jobState(): Promise<void> {
        await this.clickJobState.click();
        await this.selectJobState.click();
    }
    public async navigateToAdminHomePage(): Promise<void> {
        await this.page.goto(this.candidateHomePageUrl);
    }
    public async selectSkill(skill: string): Promise<void> {
        await this.page.getByTitle(skill, { exact: true }).click();

    }
    public async deleteJob(): Promise<void> {
        await this.threeDotButton.click();
        await this.deleteJobButton.click();
        await this.okayButton.click();
    }
    public async saveJob(): Promise<void> {
        await this.clickSaveButton.click();
    }
}




