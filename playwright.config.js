import { defineConfig, devices } from '@playwright/test';
import { ALLURE_RESULTS_DIR } from './src/common/constants/allurePaths';
import { BASE_URL } from './src/common/constants/baseUrl';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Runs once before the whole run, regardless of workers/retries — unlike
   * a worker-scoped fixture, which would re-fire (and wipe results again)
   * every time a retry spins up a fresh worker process. */
  globalSetup: './global-setup.js',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* One retry everywhere — the shared public ParaBank demo server has
   * known moments of instability unrelated to the tests themselves. */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['allure-playwright', { resultsDir: ALLURE_RESULTS_DIR }],
    ['list', { printSteps: false }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,
    /* Capture debugging artifacts only when a test actually fails. */
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
