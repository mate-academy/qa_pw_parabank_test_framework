import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test('should not show Find Transactions page without being logged in', async ({
  findTransactionsPage,
}) => {
  await allure.severity('normal');

  await findTransactionsPage.open();

  await findTransactionsPage.assertErrorShown();
});
