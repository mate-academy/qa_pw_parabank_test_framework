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

Make sure that the project dependencies and Playwright browsers are installed:

```bash
npm ci
npx playwright install
```

Run the complete test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in Playwright UI mode:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test path/to/test.spec.js
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

The tests require an internet connection to access the public Parabank
application. Loan tests automatically configure the required administration
settings before requesting a loan.

Do not use the `Clean` or `Initialize` database actions while the tests are
running.

## How to generate report

Allure requires Java 8 or newer and the Allure Commandline tool.

Install Allure Commandline globally if it is not installed:

```bash
npm install -g allure-commandline
```

Run the tests to create results in the `allure-results` directory:

```bash
npx playwright test
```

Generate the HTML report:

```bash
allure generate allure-results -o allure-report --clean
```

Open the generated report:

```bash
allure open allure-report
```

Alternatively, generate and open a temporary report with one command:

```bash
allure serve allure-results
```