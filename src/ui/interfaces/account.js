import { openNewAccounts } from '../actions/account/openNewAccount';
import { transferFunds } from '../actions/account/transferFunds';
import {
  ACCOUNT_TYPE,
  OPEN_ACCOUNT_DEPOSIT,
} from '../pages/account/OpenNewAccountPage';

export async function getDefaultAccountNumber(accountsOverviewPage) {
  await accountsOverviewPage.openAndAssert();

  return accountsOverviewPage.accountLink().textContent();
}

export async function openTrackedAccounts(
  openNewAccountPage,
  { count, fromAccount },
) {
  const accountTypeCycle = [ACCOUNT_TYPE.CHECKING, ACCOUNT_TYPE.SAVINGS];
  const specs = Array.from({ length: count }, (_, i) => ({
    accountType: accountTypeCycle[i % accountTypeCycle.length],
    fromAccount,
  }));

  const accountNumbers = await openNewAccounts(openNewAccountPage, specs);

  return specs.map((spec, i) => ({
    accountNumber: accountNumbers[i],
    accountType:
      spec.accountType === ACCOUNT_TYPE.CHECKING ? 'CHECKING' : 'SAVINGS',
    balance: OPEN_ACCOUNT_DEPOSIT,
    sent: [],
    received: [OPEN_ACCOUNT_DEPOSIT],
  }));
}

export async function makeTrackedTransfers(
  transferFundsPage,
  accounts,
  { count, amount },
) {
  const specs = Array.from({ length: count }, (_, i) => ({
    amount,
    fromAccount: accounts[i % accounts.length].accountNumber,
    toAccount: accounts[(i + 1) % accounts.length].accountNumber,
  }));

  await transferFunds(transferFundsPage, specs);

  for (const spec of specs) {
    const from = accounts.find(
      (account) => account.accountNumber === spec.fromAccount,
    );
    from.balance -= spec.amount;
    from.sent.push(spec.amount);

    const to = accounts.find(
      (account) => account.accountNumber === spec.toAccount,
    );
    to.balance += spec.amount;
    to.received.push(spec.amount);
  }
}

export async function assertAccountBalances(accountsOverviewPage, accounts) {
  await accountsOverviewPage.openAndAssert();

  for (const account of accounts) {
    await accountsOverviewPage.assertAccountBalance(
      account.accountNumber,
      account.balance,
    );
  }
}

function countByAmount(amounts) {
  const counts = new Map();

  for (const amount of amounts) {
    counts.set(amount, (counts.get(amount) ?? 0) + 1);
  }

  return counts;
}

export async function filterAccountActivityByType(
  accountDetailsPage,
  transactionType,
) {
  await accountDetailsPage.selectTransactionType(transactionType);
  await accountDetailsPage.clickGoButton();
}

export async function filterAccountActivityByMonthOffset(
  accountDetailsPage,
  monthOffset,
) {
  await accountDetailsPage.selectMonthByOffset(monthOffset);
  await accountDetailsPage.clickGoButton();
}

export async function assertTransactionTypeCounts(
  accountDetailsPage,
  { received, sent },
) {
  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Received',
    received,
  );
  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Sent',
    sent,
  );
}

export async function assertAccountActivity(
  accountsOverviewPage,
  accountDetailsPage,
  accounts,
) {
  for (const account of accounts) {
    await accountsOverviewPage.openAndAssert();
    await accountsOverviewPage.accountLinkByNumber(account.accountNumber).click();

    await accountDetailsPage.assertOpened();
    await accountDetailsPage.assertAccountNumber(account.accountNumber);
    await accountDetailsPage.assertAccountType(account.accountType);

    for (const [amount, count] of countByAmount(account.sent)) {
      await accountDetailsPage.assertTransactionCount(
        'Funds Transfer Sent',
        amount,
        count,
      );
    }

    for (const [amount, count] of countByAmount(account.received)) {
      await accountDetailsPage.assertTransactionCount(
        'Funds Transfer Received',
        amount,
        count,
      );
    }
  }
}
