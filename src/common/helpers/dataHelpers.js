import { faker } from '@faker-js/faker';
import crypto from 'crypto';

export function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const timestamp = Date.now().toString();
  const randomId = crypto.randomUUID().replace(/-/g, '').substring(0, 8);
  
  const username = `user${timestamp.substring(timestamp.length - 6)}${randomId}`;
  
  return {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number('###-###-####'),
    ssn: faker.string.numeric(9),
    username: username.toLowerCase(),
    email: `${firstName}_${faker.internet.email()}`.replace(/'/g, '').toLowerCase(),
    password: faker.internet.password({ length: 12 }),
  };
}

export function generatePayeeData() {
  return {
    payeeName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number('###-###-####'),
    accountNumber: faker.string.numeric(10),
  };
}

export function generateAccountData() {
  return {
    accountType: faker.helpers.arrayElement(['0', '1']),
    accountTypeName: faker.helpers.arrayElement(['CHECKING', 'SAVINGS']),
    initialBalance: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
  };
}

export function generateTransferData() {
  return {
    amount: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    description: faker.lorem.sentence(),
  };
}

export function generateLoanData() {
  return {
    loanAmount: faker.finance.amount({ min: 1000, max: 50000, dec: 2 }),
    downPayment: faker.finance.amount({ min: 100, max: 5000, dec: 2 }),
  };
}

export function generateTransactionSearchData() {
  return {
    transactionId: faker.string.numeric(5),
    amount: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
    date: faker.date.recent({ days: 30 }).toLocaleDateString('en-US'),
  };
}
