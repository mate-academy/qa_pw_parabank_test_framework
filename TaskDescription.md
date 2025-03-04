# Practice task: Test automation framework for the Parabank

## Preparation:

1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b task_solution
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:

1. Analize the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application for the required test coverage.
2. Create an the test covergage for the Parabank functionality.
3. Organize your test folders in the Suite hierarhy: `parentSuite`, `suite` and `subSuite`.
4. Rememebr to wrap all the actions and assertions into a step method.
5. Remember to not duplicate the code, use helper methods, actions and fixtures.
6. Organize fixtures for the certain functionality into separate files.
7. Think about parametrized tests you need to create, for example when checking the different numeric inputs.
8. Add the README.md "How to run the tests" & "How to generate report" sections.

The functionality that should be automated:

**Not logged in user:**

- _Positive and negative auth - register & sign-in._
- _Forgot login info?_

**Logged in user:**

- _Account Overview_
- _Account Overivew -> Account Details & Account Activity filtering_
- _Open New Account_
- _Transfer Funds_
- _Bill Pay_
- _Find Transactions_
- _Update Contact Info_
- _Request Loan_
- _Log out_

## Task Reporting:

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create PR for your changes.
4. Fix all the suggestions from the Code review until PR is approved.
