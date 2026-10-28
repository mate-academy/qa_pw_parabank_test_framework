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

```
npx playwright test
```

Run tests in Playwright UI mode:

```
npx playwright test --ui
```

Run a specific test file:

```
npx playwright test path/to/test.spec.js
```

For example:
```
npx playwright test tests/account/billPay/billPay.spec.js
```

## How to generate report

After the tests are executed, Allure results are generated in the `allure-results` folder.

To generate and open the Allure report:

```bash
allure serve allure-results
```

To generate the report into the `allure-report` folder:

```bash
allure generate allure-results --clean -o allure-report
```

To open the generated report:

```bash
allure open allure-report
```
