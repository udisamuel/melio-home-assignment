import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
    headless: false,
  },
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',

  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

  ],
});
