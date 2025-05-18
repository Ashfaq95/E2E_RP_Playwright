import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class JobDescriptionPage {
    private jobDescriptionPageUrl: string;
    private applyFortheJob: Locator;

    constructor(private page: Page) {
        this.jobDescriptionPageUrl = process.env.JOB_DESCRIPTION_PAGE_URL as string;
        this.applyFortheJob = this.page.getByRole('link', { name: 'Apply Now' });
    }
    public getJobDescriptionPageUrl(): string {
        return this.jobDescriptionPageUrl;
    }
    async clickapplyFortheJob(): Promise<void> {
        await this.applyFortheJob.click();
    }
}
