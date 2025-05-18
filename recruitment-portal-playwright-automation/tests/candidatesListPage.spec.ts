import { testWithCandidateWorkflow as test } from '../fixture/addCandidateFixture';
import { CandidateListPage } from '../pages/candidatesListPage.pom';
import { expect } from '@playwright/test';
test('Verify Candidate List search filters functionality after adding a new candidate to the list', async ({ addNewCandidateWorkflow, authenticatedPage }) => {
  const randomFullName = await addNewCandidateWorkflow();
  const candidateListPage = new CandidateListPage(authenticatedPage);
  await candidateListPage.searchByNameOrEmailFromCandidateList(randomFullName);
  await expect(authenticatedPage.getByText(randomFullName)).toBeVisible();
});
