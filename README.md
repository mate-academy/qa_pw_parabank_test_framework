# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md).

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing.

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.

2. Run the installation command in the project root:

```bash
npm ci
```

3. Run the browsers installation in the project root:

```bash
npx playwright install
```

4. Install Allure commandline tool (Allure requires Java 8 or higher):

```bash
npm install -g allure-commandline
```

## ParaBank application

The tests are configured to run against a local ParaBank instance in Docker instead of the public ParaBank website.

This is used to avoid access and rate-limit issues and to provide a controlled application environment with a reproducible database state.

The application is available at:

```text
http://localhost:8080/parabank/
```

Make sure the local ParaBank Docker container is running before executing the tests.

## How to run the tests

Run the whole suite:

```bash
npm test
```

Run a single spec, a folder, or a test by title:

```bash
npx playwright test tests/accounts/transferFunds/successfulFundsTransfer.spec.js

npx playwright test tests/auth

npx playwright test -g "User can transfer funds within own accounts"
```

Run with a visible browser:

```bash
npm run test:headed
```

Notes:

- `npm test` clears `allure-results/` first. Allure merges every file it finds in that folder, so results left over from earlier runs show up in the report as extra tests and mismatched retries. Always start from a clean folder.
- Do not pass `--reporter=list` (or any other `--reporter`) on the command line. It replaces the reporters configured in `playwright.config.js`, which drops `allure-playwright` and no results are written at all.

## How to generate report

```bash
npm run report
npm run report:open
```

`npm run report` builds `allure-report/` from `allure-results/`, and `npm run report:open` serves it in the browser. Both require the Allure command line tool from the installation steps above.
