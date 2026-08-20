# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root.:
```bash
npm ci
```
3. Run the browsers installation in the project root.
```bash
npx playwright install
```
4. Install Allure commandline tool (Allure requires Java 8 or higher).
```bash
npm install -g allure-commandline
```

## How to run the tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/account/transferFunds/transferFundsPositive.spec.js
```

Run in UI mode (interactive):
```bash
npx playwright test --ui
```

## How to generate report

After the test run, Allure results are collected into the `allure-results` folder automatically (configured in `playwright.config.js`).

Generate and open the HTML report:
```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

Or generate and open in one step:
```bash
allure serve allure-results
``` 


## Known issues

While testing this application, the following pre-existing site behaviors were discovered (not related to the test framework itself):

1. **Sign In with a wrong password** - in some cases, entering an incorrect password for an existing username does not show an error message, but instead logs the user into a different, unrelated account. This appears to be a real security vulnerability in the demo application.

2. **Duplicate username errors on registration** - since this is a shared public demo server, previously used usernames are never cleared, which can occasionally cause "This username already exists" errors even for freshly generated (faker-based) usernames, if a collision happens to occur. Re-running the affected test usually resolves it; the `retries: 1` setting in `playwright.config.js` also mitigates this.