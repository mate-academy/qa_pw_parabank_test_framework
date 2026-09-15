import { FIND_TRANSACTIONS_ERROR_MESSAGES } from '../../ui/constants/transactionMessages';
import { FIND_TRANSACTIONS_BUTTON } from '../../ui/constants/accountConstants';
import { faker } from '@faker-js/faker';

const INVALID_AMOUNT = 'a';

export const invalidDateFormat = () => {
  const date = faker.date.anytime();

  return [
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
};

/**
 * Each case describes every field the search criteria needs, so that criteria
 * built from more than one field are exercised as a whole. Date Range is
 * validated against both #fromDate and #toDate together - filling only one of
 * them would leave the other holding a valid value and would not describe the
 * case under test.
 */
export const invalidSearchCriteria = [
  {
    name: 'empty Transaction ID',
    fields: { transactionIdField: '' },
    button: FIND_TRANSACTIONS_BUTTON.transactionId,
    error: 'transactionIdError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.transactionId,
  },
  {
    name: 'empty Transaction Date',
    fields: { transactionDateField: '' },
    button: FIND_TRANSACTIONS_BUTTON.transactionDate,
    error: 'transactionDateError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.transactionDate,
  },
  {
    name: 'invalid Transaction Date format',
    fields: { transactionDateField: invalidDateFormat() },
    button: FIND_TRANSACTIONS_BUTTON.transactionDate,
    error: 'transactionDateError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.transactionDate,
  },
  {
    name: 'empty Date Range',
    fields: { fromDateField: '', toDateField: '' },
    button: FIND_TRANSACTIONS_BUTTON.dateRange,
    error: 'dateRangeError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.dateRange,
  },
  {
    name: 'invalid Date Range format',
    fields: {
      fromDateField: invalidDateFormat(),
      toDateField: invalidDateFormat(),
    },
    button: FIND_TRANSACTIONS_BUTTON.dateRange,
    error: 'dateRangeError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.dateRange,
  },
  {
    name: 'empty Amount',
    fields: { amountField: '' },
    button: FIND_TRANSACTIONS_BUTTON.amount,
    error: 'amountError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.amount,
  },
  {
    name: 'invalid Amount',
    fields: { amountField: INVALID_AMOUNT },
    button: FIND_TRANSACTIONS_BUTTON.amount,
    error: 'amountError',
    message: FIND_TRANSACTIONS_ERROR_MESSAGES.amount,
  },
];
