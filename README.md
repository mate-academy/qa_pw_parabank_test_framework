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

You can run the tests using the following commands:

* **Run all tests in headless mode:**
    ```bash
    npx playwright test
    ```

* **Run tests in headed mode (UI):**
    ```bash
    npx playwright test --headed
    ```

* **Run a specific test file:**
    ```bash
    npx playwright test tests/openNewAccount.spec.js
    ```

* **Run tests via npm script (if configured):**
    ```bash
    npm test
    ```

## How to generate report

The project is configured to use **Allure Report** for detailed test execution analysis.

1.  **Generate the report:**
    After the tests finish, run the following command to process the raw results from `./allure-results` into a human-readable report:
    ```bash
    allure generate ./allure-results --clean -o ./allure-report
    ```

2.  **Open the report:**
    To view the generated report in your default browser:
    ```bash
    allure open ./allure-report
    ```

3.  **Shortcut (Optional):**
    If your `package.json` includes an allure script, you can simply run:
    ```bash
    npm run allure:report
    ```