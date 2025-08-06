import { test } from '../../_fixtures/fixtures';
import { OverviewPage } from '../../../src/ui/pages/account/OverviewPage';
import { BillPayPage } from '../../../src/ui/pages/account/BillPayPage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });

test(`Bill pay for another account`, async ({ pages, users }, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'critical' });
  testInfo.annotations.push({ type: 'issue', description: 'BUG-004' });

  // Create new users
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);

  const overviewPage1 = new OverviewPage(pages[0]);
  const overviewPage2 = new OverviewPage(pages[1]);
  const billPayPage1 = new BillPayPage(pages[0]);

  await overviewPage1.open();
  const totalBalanceUser1 = await overviewPage1.getTotalBalanceText();
  const accountRowsUser1 = await overviewPage1.getAllRowsData();

  await overviewPage2.open();
  const totalBalanceUser2 = await overviewPage2.getTotalBalanceText();
  const accountRowsUser2 = await overviewPage2.getAllRowsData();

  const amount = 100;
  await test.step(`Bill pay for user 2`, async () => {
    await billPayPage1.open();
    await billPayPage1.submitPayeeInfoForm(
      users[1],
      amount,
      accountRowsUser2[0].account,
    );
    await billPayPage1.assertBillPayCompleteMessage(
      amount,
      accountRowsUser1[0].account,
    );
  });

  await test.step(`Check Total Balance of user #1`, async () => {
    await overviewPage1.open();
    await overviewPage1.assertTotalBalanceCheck(totalBalanceUser1, -amount);
  });

  await test.step(`Check Total Balance of user #2`, async () => {
    await overviewPage2.open();
    await overviewPage2.assertTotalBalanceCheck(totalBalanceUser2, +amount);
  });
});
