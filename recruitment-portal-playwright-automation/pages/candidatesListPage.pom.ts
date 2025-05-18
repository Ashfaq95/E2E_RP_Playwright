import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class CandidateListPage {
    private fillGlobalSearchOfCandidateList: Locator;
    private clickJobsFilterDropdown: Locator;
    private fillJobsFilterDropdown: Locator;
    private selectSuggestedJob: Locator;
    private clickSkillsFilterDropdown: Locator;
    private fillSkillsFilterDropdown: Locator;
    private selectSuggestedSkills: Locator;
    private clickStatusFilterDropdown: Locator;
    private fillStatusFilterDropdown: Locator;
    private selectSuggestedStatus: Locator;
    private clickApplicationDateFilterDropdown: Locator;
    private selectApplicationDate: Locator;

    constructor(private page: Page) {
        this.fillGlobalSearchOfCandidateList = this.page.getByPlaceholder('Search by name, email,');
        this.clickJobsFilterDropdown = this.page.getByRole('main').getByText('Jobs');
        this.fillJobsFilterDropdown = this.page.locator('#rc_select_1'); // fix me
        this.selectSuggestedJob = this.page.getByTitle('QA Engineer').locator('div'); //change hobe
        this.clickSkillsFilterDropdown = this.page.getByText('Skills').first();
        this.fillSkillsFilterDropdown = this.page.locator('.ant-select-selection-overflow'); //fix me
        this.selectSuggestedSkills = this.page.getByTitle('Android Apps').locator('div'); //change hobe
        this.clickStatusFilterDropdown = this.page.getByText('Status').first();
        this.fillStatusFilterDropdown = this.page.locator('.ant-select-selection-overflow'); //fix me
        this.selectSuggestedStatus = this.page.getByTitle('New Applicant', { exact: true }).locator('div'); //chnage hobe
        this.clickApplicationDateFilterDropdown = this.page.getByText('Application Date');
        this.selectApplicationDate = this.page.getByText('Last 7 Days');
    }

    public async searchByNameOrEmailFromCandidateList(candidateName: string): Promise<void> {
        await this.fillGlobalSearchOfCandidateList.fill(candidateName);
    }







}