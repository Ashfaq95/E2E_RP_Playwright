import { expect } from '@playwright/test';
import { test } from '../fixture/custom_fixture';

test('User should be able to add Skill with valid inputs', async ({ skillsListPage, authenticatedPage }) => {
    await skillsListPage.navigateToSkillsPage();
    await skillsListPage.addNewSkill('Driving');
    await expect(authenticatedPage.getByText('Skill is added')).toBeVisible({ timeout: 3000 });
    await skillsListPage.deleteSkill('Driving');
    await expect(authenticatedPage.getByText('Skill is deleted')).toBeVisible({ timeout: 3000 });
});