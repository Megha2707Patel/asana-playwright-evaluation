import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  fullyParallel: true,

  retries: 2,

  reporter: 'html',

  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});