import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for ParaBank test automation framework.
 */
export default defineConfig({
  // Directory containing test files
  testDir: './tests',

  // Run tests sequentially
  fullyParallel: false,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry settings
  retries: process.env.CI ? 0 : 0,

  // Number of workers
  workers: 1,

  // Test reporters
  reporter: [['allure-playwright'], ['list', { printSteps: true }]],

  // Shared settings for all tests
  use: {
    baseURL: 'https://parabank.parasoft.com',

    // Save trace when a test fails
    trace: 'retain-on-failure',
  },

  // Browser configuration
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
