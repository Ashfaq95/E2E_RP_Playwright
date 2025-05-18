import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class CandidateProfile {
    private candidateHomePageURL: string;
    private evaluationTab: Locator;
    private addEvaluationButton: Locator;
    private hireCheckbox: Locator;
    private goodPoints: Locator;
    private weakPoints: Locator;
    private experienceYears: Locator;
    private commentField: Locator;
    private submitButton: Locator;

    constructor(private page: Page) {
        this.candidateHomePageURL= process.env.ADMIN_HOME_URL as string;
        this.evaluationTab = this.page.getByRole('tab', { name: 'Evaluation' }).first();
        this.addEvaluationButton = this.page.getByRole('button', { name: 'Add Evaluation' });
        this.hireCheckbox = this.page.getByLabel('Hire This Candidate');
        this.goodPoints = this.page.getByPlaceholder('Good/ Strong Points');
        this.weakPoints = this.page.getByPlaceholder('Weak Points');
        this.experienceYears = this.page.getByPlaceholder('How many Year');
        this.commentField = this.page.getByPlaceholder('Interviewer’s Comment/');
        this.submitButton = this.page.getByRole('button', { name: 'Submit Now' });
    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto(this.candidateHomePageURL);
    }

    async selectCandidate(candidateName: string): Promise<void> {
        await this.page.getByRole('link', { name: candidateName, exact: true }).first().click();
    }

    async setInterview(interviewerName: string) {
        await this.page.locator('.ant-collapse-extra > .ant-btn').click();
        await this.page.getByRole('menuitem', { name: 'HR Interview Scheduled' }).locator('span').click();
        await this.page.locator('.ant-select-selection-overflow').click();
        await this.page.getByText(interviewerName, { exact: true }).press('Enter');
        await this.page.getByRole('button', { name: 'Save', exact: true }).nth(0).click();
    }

    async evaluateCandidate(): Promise<void> {
        await this.evaluationTab.click();
        await this.addEvaluationButton.click();
        await this.page.locator('.ant-radio-input').first().check();
        await this.page.locator('td:nth-child(3) > #candidate-evaluation_core_170 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').click();
        await this.page.locator('td:nth-child(3) > #candidate-evaluation_core_171 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check();
        await this.page.locator('#candidate-evaluation_core_172 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').first().check();
        await this.page.locator('#candidate-evaluation_core_173 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').first().check();
        await this.page.locator('#candidate-evaluation_cultural_1 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').first().check();
        await this.page.locator('#candidate-evaluation_cultural_3 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').first().check();
        await this.page.locator('#candidate-evaluation_cultural_25 > .ant-radio-wrapper > .ant-radio > .ant-radio-input').first().check();
        await this.goodPoints.click();
        await this.goodPoints.fill('Good points');
        await this.weakPoints.click();
        await this.weakPoints.fill('Bad Points');
        await this.experienceYears.click();
        await this.experienceYears.fill('4');
        await this.hireCheckbox.check();
        await this.commentField.fill('Nothing');
        await this.submitButton.click();
    }
}