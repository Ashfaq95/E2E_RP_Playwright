import { expect, Page, test as baseTest, BrowserContext } from '@playwright/test';
import fs from "fs";
import dotenv from 'dotenv';
import { generateToken } from "authenticator";
import { AdminLoginPage } from '../pages/adminLogin.pom';
import { UniversityEntityPage } from '../pages/universityEntity-page.pom';
import { AddSkillsPage } from '../pages/addSkillsPage.pom';
import { AddCandidatePage } from '../pages/addCandidatePage.pom';
import {CandidateListPage } from '../pages/candidatesListPage.pom'
import { CandidateProfile } from '../pages/candidateProfilePage.pom';
import { AddNewJobsPage } from '../pages/addNewJob.pom';
import { PerksAndBenefitsPage } from '../pages/parks&Benefits.pom';
import { QuotesPage } from '../pages/quotes.pom';
import { JobsPage } from '../pages/jobs.pom';
dotenv.config();

interface RecruitMentPortalCustomFixtures {
  authenticatedPage: Page;
  universityListPage: UniversityEntityPage;
  skillsListPage: AddSkillsPage;
  addCandidate: AddCandidatePage;
  candidateList: CandidateListPage;
  candidateProfile: CandidateProfile;
  addNewJobsPage: AddNewJobsPage;
  parksAndBenefitsPage: PerksAndBenefitsPage;
  quotesPage: QuotesPage;
  jobsPage: JobsPage;
};

export const test = baseTest.extend<RecruitMentPortalCustomFixtures>({
  context: async ({ browser }, use) => {
    const authFilePath = './test-results/authState.json';
    const isAuthenticated = fs.existsSync(authFilePath);
    let context: BrowserContext;

    if (isAuthenticated) {
      console.log('Storage state found, loading from file.');
      context = await browser.newContext({ storageState: authFilePath });
    } else {
      console.log('No storage state found, creating new context.');
      context = await browser.newContext();
    }
    await use(context);
    await context.close();
  },

  authenticatedPage: async ({ context }, use) => {
    const authFilePath = "./test-results/authState.json";
    const isAuthenticated = fs.existsSync(authFilePath);
    const page = await context.newPage();

    const email = process.env.ADMIN_EMAIL as string;
    const password = process.env.ADMIN_PASSWORD as string;
    const token = process.env.GOOGLE_OTP_TOKEN_ADMIN as string;

    if (!isAuthenticated) {
      console.log('Performing login.');
      const adminLoginPage = new AdminLoginPage(page);
      const otp = generateToken(token);
      await adminLoginPage.adminLogin(email, password, otp, authFilePath);
      await context.storageState({ path: authFilePath });
    }
    await use(page);
  },

  universityListPage: async ({ authenticatedPage }, use) => {
    console.log('Adding new University');
    const universityPage = new UniversityEntityPage(authenticatedPage);
    await use(universityPage);
  },

  skillsListPage: async ({ authenticatedPage }, use) => {
    console.log('Adding new Skill');
    const skillsPage = new AddSkillsPage(authenticatedPage);
    await use(skillsPage);
  },

  addCandidate: async ({ authenticatedPage }, use) => {
    console.log('Adding new Candidate');
    const addNewCandidatePage = new AddCandidatePage(authenticatedPage);
    await use(addNewCandidatePage);
  },

  // candidateList: async ({ authenticatedPage }, use) => {
  //   const candidateListPage = new CandidateListPage(authenticatedPage);
  //   await use(candidateListPage);
  // },


  candidateProfile: async ({ authenticatedPage }, use) => {
    console.log('Evaluating New added candidate');
    const candidateProfilePage = new CandidateProfile(authenticatedPage);
    await use(candidateProfilePage);
  },

  addNewJobsPage: async ({ authenticatedPage }, use) => { 
    console.log('User adds new jobs from admin');
    const addJobs = new AddNewJobsPage(authenticatedPage);
    await use(addJobs);
  },

  jobsPage: async ({ authenticatedPage }, use) => { 
    const jobs = new JobsPage(authenticatedPage);
    await use(jobs);
  },

  parksAndBenefitsPage: async ({ authenticatedPage }, use) => { 
    const perksAndBenefits = new PerksAndBenefitsPage(authenticatedPage);
    await use(perksAndBenefits);
  },

  quotesPage: async ({ authenticatedPage }, use) => { 
    console.log('User adds new quotes from admin');
    const quotes = new QuotesPage(authenticatedPage);
    await use(quotes);
  },
});
