export const testData = {
  users: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Elm Street',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      phone: '5551234567',
      ssn: '123-45-6789',
      username: 'testUser123',
      password: 'Test@1234',
    },
    invalid: {
      username: 'wrongUser',
      password: 'wrongPass',
    },
  },

  accounts: {
    defaultFrom: '12345',
    defaultTo: '67890',
  },

  transfers: [
    { from: '12345', to: '67890', amount: 10 },
    { from: '12345', to: '67890', amount: 100 },
    { from: '67890', to: '12345', amount: 50 },
  ],

  bills: {
    payeeName: 'Utility Company',
    address: '456 Oak Ave',
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    phone: '5559876543',
    account: '123456789',
    amount: '75',
  },

  loans: [
    { amount: 1000, downPayment: 100, fromAccount: '12345' },
    { amount: 5000, downPayment: 500, fromAccount: '67890' },
  ],

  contactUpdates: {
    address: '999 New Address Lane',
    city: 'Gotham',
    state: 'NJ',
    zip: '07001',
    phone: '5550009999',
  },
};
