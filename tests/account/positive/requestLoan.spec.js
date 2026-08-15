import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { submitLoanRequest } from '../../../src/ui/interfaces/requestLoan';
import { requestLoanApprovedCases } from '../../../src/common/testData/account/requestLoanCases';

for (const { title, amount, downPayment } of requestLoanApprovedCases) {
  test(`should approve a loan request with ${title}`, async ({
    page,
    user,
    accountsOverviewPage,
    requestLoanPage,
  }) => {
    await allure.severity('critical');

    await submitLoanRequest(page, user, accountsOverviewPage, requestLoanPage, {
      amount,
      downPayment,
    });

    await requestLoanPage.assertLoanApproved();
  });
}
