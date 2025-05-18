import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class AddSkillsPage {
    private clickExpandMenu: Locator;
    private clickEntities: Locator;
    private clickSkills: Locator;
    private addSkillButton: Locator;
    private skillNameInputBox: Locator;
    private deleteButton: Locator;
    private okButton: Locator;
    private skillCellActionMenu: (skillName: string) => Locator;
    private skillSaveButton: (skillName: string) => Locator;
    private adminHomePageUrl: string = process.env.ADMIN_HOME_URL as string;

    constructor(private page: Page) {
        this.clickExpandMenu = page.getByRole('complementary').getByRole('button', { name: 'right' });
        this.clickEntities = page.getByText('Entities');
        this.clickSkills = page.getByRole('link', { name: 'Skills' });
        this.addSkillButton = this.page.getByRole('button', { name: 'plus Add' });
        this.skillNameInputBox = this.page.getByRole('textbox', { name: 'Name' });
        this.deleteButton = this.page.getByText('Delete');
        this.okButton = this.page.getByRole('button', { name: 'OK' });
        this.skillCellActionMenu = (skillName: string) => this.page.getByRole('row', { name: `${skillName} Yes` }).locator('a');
        this.skillSaveButton = (skillName: string) => this.page.getByRole('row', { name: `${skillName} Parent Skill save` }).locator('a');
    }

    async navigateToSkillsPage(): Promise<void> {
        await this.page.goto(this.adminHomePageUrl);
        await this.clickExpandMenu.click();
        await this.clickEntities.click();
        await this.clickSkills.click({ timeout: 3000 }); //add skill button remains disabled if we don't use manual wait
    }

    async addNewSkill(skillName: string): Promise<void> {
        await this.addSkillButton.click();
        await this.skillNameInputBox.fill(skillName);
        await this.skillSaveButton(skillName).first().click();
    }

    async deleteSkill(skillName: string) {
        await this.skillCellActionMenu(skillName).click();
        await this.deleteButton.click();
        await this.okButton.click();
    }
}