export const INITIAL_BALANCE = 500;
export const NEW_ACCOUNT_MINIMUM_DEPOSIT = 100;

export function balanceAfterOpeningAccounts(openedAccountsCount) {
  return INITIAL_BALANCE - openedAccountsCount * NEW_ACCOUNT_MINIMUM_DEPOSIT;
}
