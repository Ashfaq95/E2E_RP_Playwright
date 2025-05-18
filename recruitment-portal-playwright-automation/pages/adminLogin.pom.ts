import { Locator, Page } from '@playwright/test';

export class AdminLoginPage {
    private continueWithGoogleLink: Locator;
    private emailField: Locator;
    private nextButton: Locator;
    private passwordField: Locator;
    private otpField: Locator;
    private adminLoginUrl: string = process.env.ADMIN_LOGIN_URL as string;
    private adminHomePageUrl: string = process.env.ADMIN_HOME_URL as string;

    constructor(private page: Page) {
        this.continueWithGoogleLink = this.page.getByLabel('Google এর মাধ্যমে সাইন-ইন করুন');
    }

    async adminLogin(email: string, password: string, otp: string, authFilePath: string): Promise<void> {
        await this.page.goto(this.adminLoginUrl);
        const page2Promise = this.page.waitForEvent('popup');
        await this.continueWithGoogleLink.click();
        const page2 = await page2Promise;
        
        await page2.getByLabel('Email or phone').fill(email);
        await page2.getByRole('button', { name: 'Next' }).click();
        await page2.getByLabel('Enter your password').fill(password);
        await page2.getByRole('button', { name: 'Next' }).click();
        await page2.getByLabel('Enter code').fill(otp);
        await page2.getByRole('button', { name: 'Next' }).click();

        await this.page.bringToFront();
        await this.page.waitForURL(this.adminHomePageUrl);
    }
}
