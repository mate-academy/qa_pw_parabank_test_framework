import { REQUEST_LOAN_ERROR_MESSAGES } from '../../ui/constants/requestLoanMessages';

export const requestLoanData = [
  {
    name: 'Approved loan',
    loanAmount: '100',
    downPayment: '20',
  },
  {
    name: 'Insufficient funds',
    loanAmount: '10000',
    downPayment: '10',
    expectedMessage: REQUEST_LOAN_ERROR_MESSAGES.insufficientFunds,
  },
  {
    name: 'Insufficient funds for down payment',
    loanAmount: '1000',
    downPayment: '1000',
    expectedMessage:
      REQUEST_LOAN_ERROR_MESSAGES.insufficientFundsForDownPayment,
  },
];
