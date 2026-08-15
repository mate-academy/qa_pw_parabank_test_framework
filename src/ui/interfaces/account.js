import { openNewAccounts } from '../actions/account/openNewAccount';
import { transferFunds } from '../actions/account/transferFunds';
import { ACCOUNT_TYPE } from '../pages/account/OpenNewAccountPage';

export async function getDefaultAccountNumber(accountsOverviewPage) {
  await accountsOverviewPage.openAndAssert();

  return accountsOverviewPage.accountLink().textContent();
}

/**
 * Opens `count` new accounts funded from `fromAccount`, alternating
 * CHECKING/SAVINGS, and returns them with locally tracked balance/activity
 * so callers can assert against real UI state later.
 *
 * `count` has no enforced upper bound, but each account adds a full
 * "Open New Account" UI flow to the caller's runtime — keep it small.
 *
 * The starting balance a new account opens with turned out NOT to be a
 * reliable constant in practice (observed both $90 and $100 across runs
 * with no code change) — so instead of assuming a fixed deposit amount,
 * this reads each account's real starting balance off the Accounts
 * Overview page right after opening it, and tracks that real value from
 * then on. See makeTrackedTransfers below for how that value caps the
 * transfer amount you can safely move out of an account.
 */
export async function openTrackedAccounts(
  openNewAccountPage,
  accountsOverviewPage,
  { count, fromAccount },
) {
  const accountTypeCycle = [ACCOUNT_TYPE.CHECKING, ACCOUNT_TYPE.SAVINGS];
  const specs = Array.from({ length: count }, (_, i) => ({
    accountType: accountTypeCycle[i % accountTypeCycle.length],
    fromAccount,
  }));

  const accountNumbers = await openNewAccounts(openNewAccountPage, specs);

  await accountsOverviewPage.openAndAssert();

  const accounts = [];
  for (const [i, spec] of specs.entries()) {
    const accountNumber = accountNumbers[i];
    const balance = await accountsOverviewPage.getAccountBalance(accountNumber);

    accounts.push({
      accountNumber,
      accountType:
        spec.accountType === ACCOUNT_TYPE.CHECKING ? 'CHECKING' : 'SAVINGS',
      balance,
      sent: [],
      received: [balance],
    });
  }

  return accounts;
}

/**
 * Round-robins `count` transfers of `amount` through `accounts`: transfer i
 * moves money from accounts[i % n] to accounts[(i + 1) % n], and updates
 * each account's tracked balance/sent/received to match.
 *
 * Requires accounts.length >= 2 — with n = 1 both indices collapse to the
 * same account, turning every "transfer" into a same-account transfer,
 * which the real server does not settle the way this bookkeeping expects
 * (throws below instead of silently producing a wrong tracked balance).
 *
 * `amount` must be > 0 and should not exceed the smallest starting balance
 * among `accounts` (see openTrackedAccounts above — that starting balance
 * is read from the real UI, not a fixed constant) — a larger amount risks
 * an "insufficient funds" failure the first time an account is used as the
 * transfer source.
 */
export async function makeTrackedTransfers(
  transferFundsPage,
  accounts,
  { count, amount },
) {
  if (accounts.length < 2) {
    throw new Error(
      'makeTrackedTransfers requires at least 2 accounts to transfer between',
    );
  }

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
