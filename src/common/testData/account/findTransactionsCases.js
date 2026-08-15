// The Find Transactions session fixture always seeds exactly these three
// transactions on the tracked account: opening the account deposits money
// automatically (amount isn't a reliable constant — read dynamically as the
// `depositAmount` fixture, see fixturesFindTransactionsSession.ts), then one
// transfer out ($30) and one transfer in ($50) create a Debit/Credit mix so
// tests can prove search actually filters by amount/date instead of just
// returning everything.

export const DEPOSIT_TRANSACTION = {
  description: 'Funds Transfer Received',
  type: 'Credit',
};

export const SENT_TRANSACTION = {
  description: 'Funds Transfer Sent',
  amount: 30,
  type: 'Debit',
};

export const RECEIVED_TRANSACTION = {
  description: 'Funds Transfer Received',
  amount: 50,
  type: 'Credit',
};
