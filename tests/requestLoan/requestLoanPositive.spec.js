import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successfully request a loan that gets approved', async ({
  requestLoanPage,
}) => {
  await requestLoanPage.open();
  await requestLoanPage.fillLoanAmountField(100);
  await requestLoanPage.fillDownPaymentField(100);
  await requestLoanPage.clickApplyNowButton();
  await requestLoanPage.assertLoanRequestProcessed();
  await requestLoanPage.assertLoanApproved();
});
