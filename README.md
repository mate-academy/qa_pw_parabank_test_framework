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
# How to run tests
1. Run all tests across all configured browsers:
```bash
npx playwright test
```
2. Run all tests in appropriate browser:
```bash
npx playwright test --project=firefox
```
3. Run specific tests file:
```bash
npx playwright test tests/auth/signIn/signInPositive.spec.js
```
## How to generate report
1. To generate an Allure report, you first need to run tests using the following command:
```bash
 npx playwright test
```
2. To create an HTML report, you need to use the command:
```bash
 allure serve allure-results
```