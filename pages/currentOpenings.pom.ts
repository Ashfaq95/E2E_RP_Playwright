import { Locator, Page, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class CurrentOpeningsPage {
    private careerPageSearchJob: Locator;
    private searchResult: Locator;
    private applicationDeadlineLabel: Locator;

    constructor(private page: Page) {
        this.careerPageSearchJob = this.page.getByRole('textbox', { name: 'Search job title, skills' });
        this.searchResult = this.page.getByRole('link', { name: 'QA Engineer 2 Designing,' });
        this.applicationDeadlineLabel = this.page.getByText('Application Deadline');
    }

    async navigateToBaseUrl(): Promise<void> {
        const baseUrl = process.env.BASE_URL!;
        await this.page.goto(baseUrl);
        expect(this.page.url()).toBe(baseUrl);
    }

    async currentOpeningPageSearchJob(text: string): Promise<void> {
        await this.careerPageSearchJob.fill(text);
    }

    async clickSearchResult(): Promise<void> {
        await this.searchResult.click();
    }
}
