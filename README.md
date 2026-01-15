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

```bash
# run all tests
npx playwright test

# run tests in a specific suite
npx playwright test tests/auth
npx playwright test tests/accountServices

# run a specific test file
npx playwright test tests/auth/login.spec.js
npx playwright test tests/accountServices/billPay.spec.js

# run tests in headed mode (with browser UI)
npx playwright test --headed

# run tests in debug mode
npx playwright test --debug

# run tests with specific workers (parallel execution)
npx playwright test --workers=4
```

## How to generate report

```bash
allure serve ./allure-results
```

### View Playwright HTML report

Playwright also generates its own HTML report:

```bash
npx playwright show-report
```
