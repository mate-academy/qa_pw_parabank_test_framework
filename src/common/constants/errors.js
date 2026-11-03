export const ERROR_TITLE = 'Error!';
export const INTERNAL_SERVER_ERROR_MESSAGE = 'An internal error has occurred and has been logged.';
export const INVALID_CREDENTIALS_ERROR_MESSAGE = 'The username and password could not be verified.';
export const EMPTY_USERNAME_OR_PASSWORD_ERROR_MESSAGE = 'Please enter a username and password.';
export const CUSTOMER_NOT_FOUND_ERROR_MESSAGE = 'The customer information provided could not be found.';

export const LOOKUP_PAGE_ERROR_MESSAGES = {
  firstNameRequiredError: 'First name is required.',
  lastNameRequiredError: 'Last name is required.',
  addressRequiredError: 'Address is required.',
  cityRequiredError: 'City is required.',
  stateRequiredError: 'State is required.',
  zipCodeRequiredError: 'Zip Code is required.',
  ssnRequiredError: 'Social Security Number is required.',
};

export const REGISTER_PAGE_ERROR_MESSAGES = {
  ...LOOKUP_PAGE_ERROR_MESSAGES,
  usernameRequiredError: 'Username is required.',
  usernameAlreadyExistsError: 'This username already exists.',
  passwordRequiredError: 'Password is required.',
  confirmPasswordRequiredError: 'Password confirmation is required.',
  passwordMismatchError: 'Passwords did not match.',
};

export const TRANSFER_PAGE_ERROR_MESSAGES = {
  emptyAmountError: 'The amount cannot be empty.',
  invalidAmountError: 'Please enter a valid amount.',
};

export const BILL_PAY_ERROR_MESSAGES = {
  payeeNameRequiredError: 'Payee name is required.',
  addressRequiredError: 'Address is required.',
  cityRequiredError: 'City is required.',
  stateRequiredError: 'State is required.',
  zipCodeRequiredError: 'Zip Code is required.',
  phoneRequiredError: 'Phone number is required.',
  accountNumberRequiredError: 'Account number is required.',
  accountNumberInvalidError: 'Please enter a valid number.',
  verifyAccountRequiredError: 'Account number is required.',
  verifyAccountInvalidError: 'Please enter a valid number.',
  verifyAccountMismatchError: 'The account numbers do not match.',
  amountRequiredError: 'The amount cannot be empty.',
  amountInvalidError: 'Please enter a valid amount.',
};

export const UPDATE_PROFILE_SUCCESS_MESSAGE =
  'Your updated address and phone number have been added to the system.';

export const LOAN_PROVIDER_NAME = 'Wealth Securities Dynamic Loans (WSDL)';

export const LOAN_PAGE_MESSAGES = {
  approved: 'Congratulations, your loan has been approved.',
  insufficientDownPayment: 'You do not have sufficient funds for the given down payment.',
  insufficientFunds: 'We cannot grant a loan in that amount with your available funds.',
};

export const FIND_TRANSACTIONS_ERROR_MESSAGES = {
  transactionIdError: 'Invalid transaction ID',
  transactionDateError: 'Invalid date format',
  dateRangeError: 'Invalid date format',
  amountError: 'Invalid amount',
};
