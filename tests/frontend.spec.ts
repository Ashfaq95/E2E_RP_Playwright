import { test } from '../fixture/custom_fixture';
import { expect } from '@playwright/test';
import { generatePerksAndBenefitsData, generateQuoteData } from '../utils/frontendDataGenerator';

test('User adds Perks & Benefits with valid inputs from the Admin Frontend', async ({ parksAndBenefitsPage }) => {
    const { randomPerksAndBenefitsTitle, randomPerksAndBenefitsBody } = generatePerksAndBenefitsData();

    await parksAndBenefitsPage.navigateToAdminHomePage();
    await parksAndBenefitsPage.addPerksAndBenefits(randomPerksAndBenefitsTitle, randomPerksAndBenefitsBody);
    await expect(parksAndBenefitsPage['perksAndBenefitsSuccessfulAdditionMsg']).toBeVisible();
});

test('User adds Quotes with valid inputs from the Admin Frontend', async ({ quotesPage }) => {
    const { randomQuote, randomAuthor, randomDesignation } = generateQuoteData();

    await quotesPage.navigateToAdminHomePage();
    await quotesPage.addQuotes(randomQuote, randomAuthor, randomDesignation);
    await expect(quotesPage['quotesSuccessfulAdditionMsg']).toBeVisible();
    await quotesPage.deleteQuotes();
});
