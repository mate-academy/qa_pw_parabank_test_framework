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

Run every test from the project root:

```bash
npx playwright test
```

Run one file, or only the tests whose title matches a pattern:

```bash
npx playwright test tests/auth/signUp/positive/signUpPositive.spec.js
npx playwright test -g "Transfer Funds"
```

Open the Playwright UI, or watch the browser while the tests run:

```bash
npx playwright test --ui
npx playwright test --headed
```

If the site starts rejecting requests, run one test at a time and wait between them. `TEST_GAP_MS` is the pause in milliseconds after each test. Restart the command so the variable is picked up:

```bash
TEST_GAP_MS=5000 npx playwright test --workers=1
TEST_GAP_MS=5000 npx playwright test --ui --workers=1
```

## How to generate report

The `allure-playwright` reporter writes results to `allure-results` after a test run. Generate the HTML report and open it:

```bash
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```

`allure serve ./allure-results` generates a temporary report and opens it in the browser. Allure needs Java 8 or higher.
