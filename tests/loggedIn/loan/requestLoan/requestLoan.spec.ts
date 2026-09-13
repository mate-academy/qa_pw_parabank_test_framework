import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Successful 'RequstLoan' flow test`, async ({
  homePage,
  requestLoanPage,
}) => {
  const LOAN_AMOUNT = faker.number.int({ min: 2, max: 100 });
  const DOWN_PAYMENT_AMOUNT = faker.number.int({ min: 2, max: 20 });

  await homePage.open();
  await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.REQUEST_LOAN);
  await requestLoanPage.enterLoanAmount(LOAN_AMOUNT);
  await requestLoanPage.enterDownPaymentAmount(DOWN_PAYMENT_AMOUNT);
  await requestLoanPage.clickSubmitButton();
  await requestLoanPage.assertApprovedLoanMessage();
});
