import { Locator, Page } from '@playwright/test';

export class UniversityEntityPage {
    private universityAddButton: Locator;
    private insertUniversityName: Locator;
    private saveUniversityButton: Locator;
    private threeDotButton: Locator;
    private deleteUniversityButton: Locator;
    private okayButton: Locator;
    private clickExpandMenu: Locator;
    private clickEntities: Locator;
    private clickUniversity: Locator;


    constructor(private page: Page) {
        this.clickExpandMenu = this.page.getByRole('complementary').getByRole('button', { name: 'right' });
        this.clickEntities = this.page.getByText('Entities');
        this.clickUniversity = this.page.getByRole('link', { name: 'Universities' });
        this.universityAddButton = page.getByRole('button', { name: 'plus Add' });
        this.insertUniversityName = page.getByRole('textbox', { name: 'Name' });
        this.saveUniversityButton = page.getByRole('img', { name: 'save' });
        this.threeDotButton = page.locator('.ant-space-item > .ant-dropdown-trigger').first();
        this.deleteUniversityButton = page.getByText('Delete');
        this.okayButton = page.getByRole('button', { name: 'OK' });
    }

    async navigateToUniversityPage(): Promise<void> {
        await this.page.goto('https://ats.cefalolab.com/admin/candidates');
        await this.clickExpandMenu.click();
        await this.clickEntities.click();
        await this.clickUniversity.click();
    }

    async addNewUniversity(universityName: string): Promise<void> {
        await this.universityAddButton.click();
        await this.insertUniversityName.fill(universityName);
        await this.saveUniversityButton.click();
    }

    async deleteNewUniversity(): Promise<void> {
        await this.threeDotButton.click();
        await this.deleteUniversityButton.click();
        await this.okayButton.click();

    }
}