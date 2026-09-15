import { faker } from '@faker-js/faker';

export const BILL_PAY_ERROR_MESSAGES = {
  payeeName: 'Payee name is required.',
  address: 'Address is required.',
  city: 'City is required.',
  state: 'State is required.',
  zipCode: 'Zip Code is required.',
  phone: 'Phone number is required.',
  accountNumber: 'Account number is required.',
  verifyAccountNumber: 'Account number is required.',
  amount: 'The amount cannot be empty.',
  accountNumbersMismatch: 'The account numbers do not match.',
};

export const INVALID_ACCOUNT_NUMBER = faker.string.numeric(5);
