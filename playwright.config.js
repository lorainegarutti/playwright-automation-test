const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'results',
  fullyParallel: true,
  reporter: [['html', { open: 'never', outputFolder: 'reports' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',

    // Record trace for each test, but remove all traces from successful test runs
    trace: 'retain-on-failure',
    launchOptions: {
      headless: true
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Test against other browser
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ]
});

