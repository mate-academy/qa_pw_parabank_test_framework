import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { generateLoanData } from '../../src/common/helpers/dataHelpers';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Request Loan Tests', () => {
  test('User can request a loan', async ({
    page,
    loggedInUser,
    requestLoanPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.REQUEST_LOAN);
    await allure.story('User is able to request loans');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'loan', 'request');

    const loanData = generateLoanData();

    await requestLoanPage.open();
    await requestLoanPage.fillLoanAmountInput(loanData.loanAmount);
    await requestLoanPage.fillDownPaymentInput(loanData.downPayment);
    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessed();
    await requestLoanPage.assertLoanApprovedOrDenied();
  });

  test.describe('Loan Amount Validation', () => {
    const validLoanData = generateLoanData();
    
    const testData = [
      { loanAmount: '0', downPayment: '0', description: 'zero amounts' },
      {
        loanAmount: '-1000',
        downPayment: validLoanData.downPayment,
        description: 'negative loan amount',
      },
      {
        loanAmount: validLoanData.loanAmount,
        downPayment: '-100',
        description: 'negative down payment',
      },
      {
        loanAmount: 'abc',
        downPayment: validLoanData.downPayment,
        description: 'non-numeric loan amount',
      },
      {
        loanAmount: validLoanData.loanAmount,
        downPayment: 'xyz',
        description: 'non-numeric down payment',
      },
    ];

    testData.forEach(({ loanAmount, downPayment, description }) => {
      test(`User cannot request loan with ${description}`, async ({
        page,
        loggedInUser,
        requestLoanPage,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.REQUEST_LOAN);
        await allure.story('User cannot request loan with invalid amounts');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'loan', 'validation', 'parametrized');

        await requestLoanPage.open();
        await requestLoanPage.fillLoanAmountInput(loanAmount);
        await requestLoanPage.fillDownPaymentInput(downPayment);
        await requestLoanPage.clickApplyNowButton();

        await requestLoanPage.assertErrorShownOrLoanNotApproved();
      });
    });
  });

  test('User can request a large loan and potentially get denied', async ({
    page,
    loggedInUser,
    requestLoanPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.REQUEST_LOAN);
    await allure.story('User is able to request loans (edge cases)');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'loan', 'request', 'edge-case');

    const edgeCaseLoanData = generateLoanData();
    const largeLoanAmount = '999999999';

    await requestLoanPage.open();
    await requestLoanPage.fillLoanAmountInput(largeLoanAmount);
    await requestLoanPage.fillDownPaymentInput(edgeCaseLoanData.downPayment);
    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessed();
    await requestLoanPage.assertLoanApprovedOrDenied();
  });
});
