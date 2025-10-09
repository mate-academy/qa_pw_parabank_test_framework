// src/config/testData.js
const testData = {
  users: {
    validUser: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: 'Password123',
      ssn: '123-45-6789',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '555-1234',
    },
    invalidUser: {
      username: 'invalid',
      password: 'wrong',
    },
  },
  accounts: {
  },
};

export default testData;
