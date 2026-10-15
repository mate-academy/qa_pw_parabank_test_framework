
# ParaBank Playwright Test Framework

## Task Description

To see the original task assignment, [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md).

## Repository Overview

This repository contains an automated end-to-end testing framework for the [ParaBank](https://parabank.parasoft.com/parabank/index.htm) web banking application.

The framework is built with Playwright and follows the Page Object Model (POM) design pattern.

It uses reusable fixtures, test actions, helper functions, generated test data, and Allure reporting.

## Technologies

- JavaScript and TypeScript
- Node.js
- Playwright Test
- Page Object Model (POM)
- Playwright Fixtures
- Faker.js
- Allure Report
- ESLint and Prettier

## Test Coverage

The framework covers the following application functionality:

### Authentication

- Positive and negative user registration
- Positive and negative sign-in
- Forgot Login Info
- Unauthorized access
- Log Out

### Accounts

- Accounts Overview
- Account Details
- Account Activity filtering
- Open New Account (Checking and Savings)

### Banking Operations

- Transfer Funds
- Bill Pay
- Find Transactions
- Request Loan

### User Profile

- Update Contact Info

The test suite includes positive, negative, and parameterized scenarios.

## Framework Architecture

The project uses the following structure:

```text
src/
├── common/
│   ├── helpers/
│   └── testData/
└── ui/
    ├── actions/
    └── pages/

tests/
├── _fixtures/
├── accounts/
├── auth/
├── loans/
├── payments/
├── profile/
├── transactions/
└── transfers/

playwright.config.js
README.md
```

### Page Objects

Page Object classes contain page locators and reusable methods for interacting with the application.

### Fixtures

Custom Playwright fixtures provide reusable page objects and generated test data.

Fixtures are grouped by functionality and combined into a shared test fixture.

### Actions

Reusable action functions simplify common workflows, such as registering a new user.

### Test Data

Faker.js and Node.js utilities generate dynamic test data.

Unique usernames are generated to reduce conflicts between test executions.

### Test Steps

Test actions and assertions use `test.step()` to provide detailed execution information in Playwright and Allure reports.

## How to Use This Project

### Prerequisites

- Node.js
- npm
- Git

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/KoLpI76/qa_pw_parabank_test_framework.git
```

2. Open the project directory:

```bash
cd qa_pw_parabank_test_framework
```

3. Install project dependencies:

```bash
npm ci
```

4. Install Playwright browsers:

```bash
npx playwright install
```

## How to Run the Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run a Specific Test File

For example, run the positive registration test:

```bash
npx playwright test tests/auth/register/registerPositive.spec.js
```

### Run Tests from a Specific Directory

For example, run all Bill Pay tests:

```bash
npx playwright test tests/payments/billPay/
```

### Run Tests by Name

```bash
npx playwright test --grep "Register"
```

### Run Tests with Repeated Executions

```bash
npx playwright test --repeat-each=3
```

### Run Tests with One Worker

```bash
npx playwright test --workers=1
```

### Open Playwright HTML Report

```bash
npx playwright show-report
```

### Debug Tests

```bash
npx playwright test --debug
```

## How to Generate Report

The project uses Allure Report to display detailed test execution results.

### Generate Allure Results

Run the tests:

```bash
npx playwright test
```

Playwright generates Allure result files in the `allure-results` directory when the Allure reporter is configured.

### Generate Allure Report

```bash
npx allure generate --output allure-report
```

### Generate and Open Allure Report

```bash
npx allure generate --output allure-report --open
```

### Generate a Clean Report

To remove results from previous executions, delete the generated directories before running the tests again.

For Git Bash:

```bash
rm -rf allure-results allure-report
```

Then execute:

```bash
npx playwright test
```

And generate the report:

```bash
npx allure generate --output allure-report --open
```

**Note:** Allure 3 does not support the legacy `--clean` option used by older Allure CLI versions.

## Test Reporting

Allure reports include:

- Test execution status
- Test duration
- Test hierarchy
- Test steps
- Severity labels
- Failure details
- Available test attachments

The framework uses Allure labels such as `parentSuite`, `suite`, `subSuite`, and severity to organize test results.

## Known Application and Environment Issues

### Cloudflare Rate Limiting

The public ParaBank environment may temporarily restrict access during repeated automated test executions.

Observed Cloudflare responses include:

- Security verification pages
- Error 1015: You are being rate limited

When this occurs, tests may fail before reaching the functionality they are intended to verify.

**Recommendation:** Avoid excessive repeated full-suite executions and allow the temporary restriction to expire before testing again.

### Sign-In Error Responses

Some negative sign-in scenarios return the following application error:

```text
An internal error has occurred and has been logged.
```

This behavior has been observed when using a non-existing username or an incorrect password.

The tests retain their expected validation behavior rather than accepting an unexpected server error as a successful result.

### External Test Environment

The application is hosted on a public external environment.

Test execution may be affected by:

- Temporary application unavailability
- Server-side errors
- Cloudflare access restrictions
- Network instability

These external failures should be investigated separately from defects in the automation framework.

## Test Results

The framework contains 60 Playwright test cases.

Execution results may vary depending on the availability and behavior of the public ParaBank environment.

Detailed results can be reviewed using the Playwright HTML report or Allure Report.

## Author

GitHub: [KoLpI76](https://github.com/KoLpI76)
