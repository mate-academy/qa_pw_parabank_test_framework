export const ACCOUNT_ACCESS_DENIED_ERROR =
  'An internal error has occurred and has been logged.';

export const OPEN_ACCOUNT_SUCCESS_MESSAGE =
  'Congratulations, your account is now open.';

export const TRANSFER_COMPLETE_HELP_TEXT =
  'See Account Activity for more details.';

export function transferCompleteMessage(amount, fromAccount, toAccount) {
  return `$${amount} has been transferred from account #${fromAccount} to account #${toAccount}.`;
}

export const BILL_PAY_REQUIRED_FIELD_ERRORS = {
  name: 'Payee name is required.',
  street: 'Address is required.',
  city: 'City is required.',
  state: 'State is required.',
  zipCode: 'Zip Code is required.',
  phoneNumber: 'Phone number is required.',
};

export const BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR =
  'Account number is required.';

export const BILL_PAY_INVALID_NUMBER_ERROR = 'Please enter a valid number.';

export const BILL_PAY_ACCOUNT_MISMATCH_ERROR =
  'The account numbers do not match.';

export const BILL_PAY_AMOUNT_REQUIRED_ERROR =
  'The amount cannot be empty.';

export const BILL_PAY_AMOUNT_INVALID_ERROR = 'Please enter a valid amount.';

export function billPaymentCompleteMessage(payeeName, amount, fromAccount) {
  return `Bill Payment to ${payeeName} in the amount of $${Number(amount).toFixed(2)} from account ${fromAccount} was successful.`;
}
