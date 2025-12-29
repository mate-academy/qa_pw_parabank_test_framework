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

<<<<<<< HEAD
// TODO - It's part of your task to add the appropriate instructions here. 
=======
Run all tests from the project root:
npm run test

Run a specific test file:
npm run test:single -- tests/auth/login.spec.ts

Run tests in a specific folder:
npm run test:single -- tests/accounts/

Run tests in debug mode (opens Playwright Inspector):
npm run test:single -- --debug

## How to generate Allure report

Run tests with Allure reporter:
npm run test:allure

Generate the Allure report:
npm run allure:generate

Open the report in your browser:
npm run allure:open

## Task Reporting

Add and commit all your updates:
git add .
git commit -m "Task solution with full test instructions and Allure report setup"

Push the code to your forked repo:
git push origin task_solution

Create a Pull Request for your changes and address all suggestions from the code review until the PR is approved.


>>>>>>> 020f19e (Update README with test and Allure instructions)

## How to generate report

// TODO - It's part of your task to add the appropriate instructions here. 
