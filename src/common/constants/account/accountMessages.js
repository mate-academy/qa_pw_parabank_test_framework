export const ACCOUNT_ACCESS_DENIED_ERROR =
  'An internal error has occurred and has been logged.';

export const OPEN_ACCOUNT_SUCCESS_MESSAGE =
  'Congratulations, your account is now open.';

export const TRANSFER_COMPLETE_HELP_TEXT =
  'See Account Activity for more details.';

export function transferCompleteMessage(amount, fromAccount, toAccount) {
  return `$${amount} has been transferred from account #${fromAccount} to account #${toAccount}.`;
}
