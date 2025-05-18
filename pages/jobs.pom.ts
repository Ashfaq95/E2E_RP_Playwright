import { Locator, Page } from '@playwright/test';

export class JobsPage {
    private jobPageSearchBar: Locator;

    constructor(private page: Page) {
        this.jobPageSearchBar = this.page.getByPlaceholder('Search with Title, Summary');
    }

    async searchJob(title: string): Promise<void> {
        await this.jobPageSearchBar.fill(title);
    }
    
    getJobTitleLocator(title: string): Locator {
        return this.page.getByRole('cell', { name: title });
    }
}
