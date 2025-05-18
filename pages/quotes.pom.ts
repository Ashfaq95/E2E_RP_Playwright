import { Locator, Page, expect } from '@playwright/test';

export class QuotesPage {
    private candidateHomePageUrl: string;
    private clickExpandMenu: Locator;
    private clickFrontEndLabel: Locator;
    private clickQuotesLabel: Locator;
    private clickAddNewQuotes: Locator;
    private fillQuote: Locator;
    private fillAuthor: Locator;
    private fillDesignation: Locator;
    private clickAddTick: Locator;
    private clickSaveButton: Locator;
    private quotesSuccessfulAdditionMsg: Locator;
    private deleteQuotesButton: Locator;

    constructor(private page: Page) {
        this.candidateHomePageUrl = 'https://ats.cefalolab.com/admin/candidates';
        this.clickExpandMenu = this.page.getByRole('complementary').getByRole('button', { name: 'right' });
        this.clickFrontEndLabel = this.page.getByText('Frontend');
        this.clickQuotesLabel = this.page.getByRole('link', { name: 'Quotes' });
        this.clickAddNewQuotes = this.page.getByRole('button', { name: 'Add New Quote' });
        this.fillQuote = this.page.getByPlaceholder('Quote');
        this.fillAuthor = this.page.getByPlaceholder('Author');
        this.fillDesignation = this.page.getByPlaceholder('Designation');
        this.clickAddTick = this.page.getByRole('button').locator('.svg-inline--fa.fa-check'); // fix me
        this.clickSaveButton = this.page.getByRole('button', { name: 'save' });
        this.quotesSuccessfulAdditionMsg = this.page.getByText('Quote is updated');
        this.deleteQuotesButton = this.page.getByRole('button').locator('.svg-inline--fa.fa-trash-can').first(); // fix me
    }

    async navigateToAdminHomePage(): Promise<void> {
        await this.page.goto(this.candidateHomePageUrl);
    }
    async addQuotes(randomQuote: string, randomAuthor: string, randomDesignation: string): Promise<void> {
        await this.clickExpandMenu.click();
        await this.clickFrontEndLabel.click();
        await this.clickQuotesLabel.click();
        await this.clickAddNewQuotes.click();
        await this.fillQuote.fill(randomQuote);
        await this.fillAuthor.fill(randomAuthor);
        await this.fillDesignation.fill(randomDesignation);
        await this.clickAddTick.click();
        await this.clickSaveButton.click();
    }
    async deleteQuotes(): Promise<void> {
        await this.deleteQuotesButton.click();
    }
}
