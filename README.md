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

Run a single test file:
```bash
npx playwright test tests/accountServices/Bill/createBillPayPositive.spec.js
```

Run tests by title:
```bash
npx playwright test -g "Successful `Sign up` flow test"
```

Run in a specific browser:
```bash
npx playwright test --project=chromium
```

Run with a visible browser or in debug mode:
```bash
npx playwright test --headed
npx playwright test --debug
```

## How to generate report

The tests use the `allure-playwright` reporter, so after every run the raw results are saved to the `allure-results` folder.

1. Run the tests:
```bash
npx playwright test
```
2. Generate the report:
```bash
allure generate allure-results --clean -o allure-report
```
3. Open the report in the browser:
```bash
allure open allure-report
```

To generate and open the report in one step:
```bash
allure serve allure-results
```

Make sure Java 8 or higher and `allure-commandline` are installed (see the installation steps above).
