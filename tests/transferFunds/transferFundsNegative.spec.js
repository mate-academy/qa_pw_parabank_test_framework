import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  EMPTY_AMOUNT_MESSAGE,
  INVALID_AMOUNT_MESSAGE,
} from '../../src/ui/constants/transferFundsErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    amount: '',
    message: EMPTY_AMOUNT_MESSAGE,
    title: 'empty amount',
  },
  {
    amount: 'abc',
    message: INVALID_AMOUNT_MESSAGE,
    title: 'invalid non-numeric amount',
  },
];

testParameters.forEach(({ amount, message, title }) => {
  test.describe('Transfer funds negative tests', () => {
    test(`Transfer funds with ${title}`, async ({ transferFundsPage }) => {
      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertErrorMessageContainsText(message);
    });
  });
});
