import { test } from '../../../fixtures/fixturesUser';

test.describe('Request Loan', () => {

  test('User can request a loan successfully', async ({ userActions }) => {
    await userActions.requestLoan(5000, 500, '12345');
  });

  test('Loan request fails for invalid amount', async ({ userActions }) => {
    await userActions.requestLoan(-1000, 0, '12345');
  });

});
