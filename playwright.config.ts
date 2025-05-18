import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI ? "github":"html",
  timeout: 120000,

  use: {
    trace: "retain-on-failure",
    video: "retain-on-failure",
    headless: !!process.env.CI,
    testIdAttribute: "data-test",
    navigationTimeout: 120000,
    actionTimeout: 120000, //need to reduce
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
