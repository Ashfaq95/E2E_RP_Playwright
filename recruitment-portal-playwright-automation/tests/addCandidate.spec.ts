import { testWithCandidateWorkflow as test } from '../fixture/addCandidateFixture';
import { generateJobApplicationFormData } from '../utils/candidateDataGenerator';
import { expect } from '@playwright/test';

test('User should be able to add Candidate with valid inputs from the admin side', async ({ addNewCandidateWorkflow }) => {
  const randomFullName = await addNewCandidateWorkflow();
  console.log(`Generated Candidate Full Name: ${randomFullName}`);

});



