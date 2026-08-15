import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { submitLoanRequest } from '../../../src/ui/interfaces/requestLoan';
import { requestLoanBusinessLogicBugCases } from '../../../src/common/testData/account/requestLoanNegativeCases';
import { requestLoanDeniedCases } from '../../../src/common/testData/account/requestLoanDeniedCases';

for (const { title, amount, downPayment } of requestLoanBusinessLogicBugCases) {
  test(`should not approve a loan request with ${title}`, async ({
    page,
    user,
    accountsOverviewPage,
    requestLoanPage,
  }) => {
    // See KNOWN_ISSUES.md — BUG-1.
    test.fail();

    await allure.severity('normal');

    await submitLoanRequest(page, user, accountsOverviewPage, requestLoanPage, {
      amount,
      downPayment,
    });

    await requestLoanPage.assertLoanNotApproved();
  });
}

for (const { title, amount, downPayment, message } of requestLoanDeniedCases) {
  test(`should deny a loan request with ${title}`, async ({
    page,
    user,
    accountsOverviewPage,
    requestLoanPage,
  }) => {
    await allure.severity('normal');

    await submitLoanRequest(page, user, accountsOverviewPage, requestLoanPage, {
      amount,
      downPayment,
    });

    await requestLoanPage.assertLoanDenied(message);
  });
}

test('should not show Request Loan page without being logged in', async ({
  requestLoanPage,
}) => {
  await allure.severity('normal');

  await requestLoanPage.open();

  await requestLoanPage.assertAccessDenied();
});
