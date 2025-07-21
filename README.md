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

npx playwright test

## How to generate report

allure serve allure-results
