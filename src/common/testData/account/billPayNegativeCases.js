import {
  BILL_PAY_REQUIRED_FIELD_ERRORS,
  BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  BILL_PAY_INVALID_NUMBER_ERROR,
  BILL_PAY_ACCOUNT_MISMATCH_ERROR,
  BILL_PAY_AMOUNT_REQUIRED_ERROR,
  BILL_PAY_AMOUNT_INVALID_ERROR,
} from '../../constants/account/accountMessages';

export const requiredFieldCases = [
  {
    dataField: 'name',
    errorKey: 'name',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.name,
  },
  {
    dataField: 'street',
    errorKey: 'address',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.street,
  },
  {
    dataField: 'city',
    errorKey: 'city',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.city,
  },
  {
    dataField: 'state',
    errorKey: 'state',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.state,
  },
  {
    dataField: 'zipCode',
    errorKey: 'zipCode',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.zipCode,
  },
  {
    dataField: 'phoneNumber',
    errorKey: 'phoneNumber',
    message: BILL_PAY_REQUIRED_FIELD_ERRORS.phoneNumber,
  },
];

export const numberFieldCases = [
  {
    title: 'empty account number',
    override: () => ({ accountNumber: '' }),
    errorKey: 'account-empty',
    message: BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  },
  {
    title: 'invalid account number',
    override: () => ({ accountNumber: 'abc' }),
    errorKey: 'account-invalid',
    message: BILL_PAY_INVALID_NUMBER_ERROR,
  },
  {
    title: 'empty verify account number',
    override: () => ({ verifyAccountNumber: '' }),
    errorKey: 'verifyAccount-empty',
    message: BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  },
  {
    title: 'invalid verify account number',
    override: () => ({ verifyAccountNumber: 'abc' }),
    errorKey: 'verifyAccount-invalid',
    message: BILL_PAY_INVALID_NUMBER_ERROR,
  },
  {
    title: 'mismatched verify account number',
    override: (data) => ({
      verifyAccountNumber: String(Number(data.accountNumber) + 1),
    }),
    errorKey: 'verifyAccount-mismatch',
    message: BILL_PAY_ACCOUNT_MISMATCH_ERROR,
  },
  {
    title: 'empty amount',
    override: () => ({ amount: '' }),
    errorKey: 'amount-empty',
    message: BILL_PAY_AMOUNT_REQUIRED_ERROR,
  },
  {
    title: 'invalid amount',
    override: () => ({ amount: 'abc' }),
    errorKey: 'amount-invalid',
    message: BILL_PAY_AMOUNT_INVALID_ERROR,
  },
];
