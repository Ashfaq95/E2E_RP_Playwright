
import { expect } from '@playwright/test';
import { test } from '../fixture/custom_fixture';

test('User should be able to add University to the list', async ({ universityListPage, authenticatedPage }) => {
    await universityListPage.navigateToUniversityPage();
    await universityListPage.addNewUniversity('University Of Testpedia for Testing');
    await expect(authenticatedPage.getByText('University  is added')).toBeVisible({ timeout: 3000 });
    await universityListPage.deleteNewUniversity();
    await expect(authenticatedPage.getByText('University is deleted')).toBeVisible({ timeout: 3000 });
});
