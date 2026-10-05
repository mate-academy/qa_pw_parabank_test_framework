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

Install dependencies and browsers (first time only):
```bash
npm ci
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Run a specific file or folder by name:
```bash
npx playwright test registration
npx playwright test billPayment
```

Run a single test by name:
```bash
npx playwright test -g "Successful Registration flow"
```

Run in headed mode (watch the browser):
```bash
npx playwright test --headed
```

## How to generate report

This project uses Allure. After a test run:
```bash
npx allure generate --clean
npx allure open
```

If `allure-commandline` isn't installed yet:
```bash
npm install --save-dev allure-commandline
```