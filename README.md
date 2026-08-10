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

Run the entire suite (do this if you want the Allure report to include every test — see note below):
```bash
npx playwright test
```

Run tests in interactive UI mode:
```bash
npx playwright test --ui
```

Run a single spec file:
```bash
npx playwright test tests/account/positive/billPay.spec.js
```

> Note: the results directory is cleared at the start of every run. Running a single file
> or a single test will produce a report containing only that run — run the full suite in
> one go if you want a complete report.

## How to generate report

After running the tests, generate the HTML report from the collected results:
```bash
npm run allure:generate
```

Then open it in your browser:
```bash
npm run allure:open
```
