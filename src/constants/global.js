export const URLS = {
  BASE: 'https://parabank.parasoft.com',
  LOGIN: '/parabank/index.htm',
  REGISTER: '/parabank/register.htm',
  ACCOUNTS_OVERVIEW: '/parabank/overview.htm',
  OPEN_ACCOUNT: '/parabank/openaccount.htm',
  TRANSFER_FUNDS: '/parabank/transfer.htm',
  BILL_PAY: '/parabank/billpay.htm',
  FIND_TRANSACTIONS: '/parabank/findtrans.htm',
  UPDATE_CONTACT: '/parabank/updateprofile.htm',
  REQUEST_LOAN: '/parabank/requestloan.htm',
  LOGOUT: '/parabank/logout.htm',
};

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
  EXTRA_LONG: 60000,
};

export const DATA_RANGES = {
  AMOUNT: { MIN: 10, MAX: 10000 },
  LOAN: { MIN: 1000, MAX: 50000 },
  DOWN_PAYMENT: { MIN: 100, MAX: 5000 },
  TRANSFER: { MIN: 10, MAX: 5000 },
  BILL_PAY: { MIN: 10, MAX: 10000 },
};

export const PATTERNS = {
  ZIP_CODE: '#####',
  PHONE: '###-###-####',
  SSN_LENGTH: 9,
};
