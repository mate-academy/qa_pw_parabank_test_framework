# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# Usage

## Installation

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
> Note: this installs the `allure` CLI globally. If `allure generate`/`allure open`
> (invoked below via `npm run allure:generate` / `npm run allure:open`) fail with
> a "command not found" error, your npm global bin directory isn't on PATH — check
> it with `npm config get prefix` (on Windows the CLI lives directly in that
> folder; on macOS/Linux it's `<prefix>/bin`) and add it to your PATH.

## Running Tests

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

## Generating the Allure Report

> Note: run the tests at least once first — `allure-results`/`allure-report` are
> gitignored, so a fresh checkout won't have them yet, and generating a report
> from a missing/empty results folder will fail.

After running the tests, generate the HTML report from the collected results:
```bash
npm run allure:generate
```

Then open it in your browser:
```bash
npm run allure:open
```

## Known Issues

The application under test is a live, third-party demo with no dev/QA feedback
loop on our side. Bugs found in it, and the difficulties/workarounds that came
up while stabilizing this suite against it, are tracked in
[KNOWN_ISSUES.md](KNOWN_ISSUES.md).
