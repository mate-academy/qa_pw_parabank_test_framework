export const requestLoanDeniedCases = [
  {
    title: 'a down payment far exceeding the loan amount',
    amount: 100,
    downPayment: 1000,
    message: 'You do not have sufficient funds for the given down payment.',
  },
  {
    title: 'a loan amount far exceeding the down payment',
    amount: 1_000_000,
    downPayment: 1,
    message: 'We cannot grant a loan in that amount with your available funds.',
  },
];
