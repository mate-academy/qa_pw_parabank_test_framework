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

Run all tests from the project root:

```bash
npx playwright test
```

## How to generate report

This project uses Allure to generate test reports. 

1.Run the tests (this will generate the allure-results folder):
```bash
npx playwright test
```

2.To generate and open the report:
```bash
allure serve allure-results
```

3.View the report in the browser. Tests are grouped in the Suites tab