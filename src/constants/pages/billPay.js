export const BILL_PAY_ERROR_MESSAGES = {
  PAYEE_NAME: 'Payee name is required.',
  ADDRESS: 'Address is required.',
  CITY: 'City is required.',
  STATE: 'State is required.',
  ZIP_CODE: 'Zip Code is required.',
  PHONE_NUMBER: 'Phone number is required.',
  ACCOUNT_NUMBER: 'Account number is required.',
  VERIFY_ACCOUNT_NUMBER: 'Account number is required.',
  MISMATCH_ACCOUNT_NUMBER: 'The account numbers do not match.',
  AMOUNT: 'The amount cannot be empty.',
  FROM_ACCOUNT: 'From account is required.',
};

export const BILL_PAY_ERROR_ID_MAP = {
  payeeName: 'validationModel-name',
  address: 'validationModel-address',
  city: 'validationModel-city',
  state: 'validationModel-state',
  zipCode: 'validationModel-zipCode',
  phoneNumber: 'validationModel-phoneNumber',
  accountNumber: 'validationModel-account-empty',
  amount: 'validationModel-amount-empty',
  mismatchAccountNumber: 'validationModel-verifyAccount-mismatch',
};
