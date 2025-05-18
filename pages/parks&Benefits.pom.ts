import { Locator, Page } from '@playwright/test';

export class PerksAndBenefitsPage {
    private candidateHomePageUrl: string;
    private clickExpandMenu: Locator;
    private clickFrontEndLabel: Locator;
    private clickPerksAndBenefits: Locator;
    private clickAddNewBenefits: Locator;
    private fillPerksAndBenifitsTitle: Locator;
    private fillPerksAndBenifitsBody: Locator;
    private clickAddTick: Locator;
    private clickSaveButton: Locator;
    private perksAndBenefitsSuccessfulAdditionMsg: Locator;
    private deletePerksAndBenefitsButton: Locator;

    constructor(private page: Page) {
        this.candidateHomePageUrl = 'https://ats.cefalolab.com/admin/candidates';
        this.clickExpandMenu = this.page.getByRole('complementary').getByRole('button', { name: 'right' });
        this.clickFrontEndLabel = this.page.getByText('Frontend');
        this.clickPerksAndBenefits = this.page.getByRole('link', { name: 'Parks & Benefits' });
        this.clickAddNewBenefits = this.page.getByRole('button', { name: 'Add New Benefit' });
        this.fillPerksAndBenifitsTitle = this.page.getByPlaceholder('Title');
        this.fillPerksAndBenifitsBody = this.page.getByPlaceholder('Body');
        this.clickAddTick = this.page.locator('form').filter({ hasText: 'Icon*3d_rotationTitle*Body*' }).getByRole('button').nth(1); //fix me
        this.clickSaveButton = this.page.getByRole('button', { name: 'save' });
        this.perksAndBenefitsSuccessfulAdditionMsg = this.page.getByText('Benefit is updated');
        this.deletePerksAndBenefitsButton = this.page.locator('.ant-form > div > .ant-flex > button:nth-child(2)').first(); //fix me
    }

    async navigateToAdminHomePage(): Promise<void> {
        await this.page.goto(this.candidateHomePageUrl);
    }

    async addPerksAndBenefits(randomPerksAndBenifitsTitle: string, randomPerksAndBenifitsBody: string): Promise<void> {
        await this.clickExpandMenu.click();
        await this.clickFrontEndLabel.click();
        await this.clickPerksAndBenefits.click();
        await this.clickAddNewBenefits.click();
        await this.fillPerksAndBenifitsTitle.fill(randomPerksAndBenifitsTitle);
        await this.fillPerksAndBenifitsBody.fill(randomPerksAndBenifitsBody);
        await this.clickAddTick.click();
        await this.clickSaveButton.click();
    }
    
    async deletePerksAndBenefits(): Promise<void> {
        await this.deletePerksAndBenefitsButton.click();
    }
}
