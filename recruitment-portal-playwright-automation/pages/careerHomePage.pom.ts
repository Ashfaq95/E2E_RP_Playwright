import { Locator, Page, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class CareerHomePage {
    private careerPageSearchJob: Locator;
    private searchResult: Locator;
    private applicationDeadlineLabel: Locator;

    constructor(private page: Page) {
        this.careerPageSearchJob = this.page.getByRole('textbox', { name: 'Search job title, skills' });
        // this.searchResult = this.page.getByRole('link', { name: 'QA Engineer 2 Designing,' });
        this.searchResult = this.page.getByRole('heading', { name: 'QA Engineer 2' });
        this.applicationDeadlineLabel = this.page.getByText('Application Deadline');
    }

    async navigateToBaseUrl(): Promise<void> {
        const baseUrl = process.env.BASE_URL!;
        await this.page.goto(baseUrl);
        expect(this.page.url()).toBe(baseUrl);
    }

    async searchJobFromCurrentOpeningsPage(text: string): Promise<void> {
        // await this.careerPageSearchJob.fill(text);
        await this.searchResult.click();
    }

}
