# Practice task: Test automation framework for the Parabank

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch:
git checkout -b task_solution

3. Install dependencies and Playwright browsers:
npm ci
npx playwright install

4. Install Allure command-line tool (requires Java 8+):
npm install -g allure-commandline

## Main task

1. Analyze the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application for the required test coverage.
2. Create test coverage for the Parabank functionality.
3. Organize your test folders in the suite hierarchy: parentSuite, suite, and subSuite.
4. Add severity metadata to each test using Allure annotations.
5. Wrap all actions and assertions into step methods.
6. Avoid code duplication – use helper methods, actions, and fixtures.
7. Organize fixtures for specific functionality into separate files.
8. Create parametrized tests where needed, for example when checking different numeric inputs.
9. Add sections in README: "How to run the tests" & "How to generate report".

## Functionality to automate

**Not logged in user:**
- Positive and negative auth – register & sign-in
- Forgot login info?

**Logged in user:**
- Account Overview
- Account Overview → Account Details & Account Activity filtering
- Open New Account
- Transfer Funds
- Bill Pay
- Find Transactions
- Update Contact Info
- Request Loan
- Log out

## How to run the tests

Run all tests from the project root:
npx playwright test

Run a specific test file:
npx playwright test tests/auth/login.spec.ts

Run tests in a specific folder:
npx playwright test tests/accounts/

Run tests in debug mode (opens Playwright Inspector):
npx playwright test --debug

## How to generate Allure report

Run tests with results output to allure-results folder:
npx playwright test --output=allure-results

Generate the report:
allure generate allure-results --clean

Open the report in your browser:
allure open

## Task Reporting

Add and commit all your updates:
git add .
git commit -m "Task solution with full test instructions and Allure report setup"

Push the code to your forked repo:
git push origin task_solution

Create a Pull Request for your changes and address all suggestions from the code review until the PR is approved.




