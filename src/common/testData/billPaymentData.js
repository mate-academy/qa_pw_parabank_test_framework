import { faker } from '@faker-js/faker';

const PHONE_NUMBER_LENGTH = 10;
const ACCOUNT_NUMBER_LENGTH = 8;
const PAYMENT_AMOUNT = '25.00';

export function createBillPaymentData() {
  const accountNumber = faker.string.numeric(ACCOUNT_NUMBER_LENGTH);

  return {
    payeeName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.string.numeric(PHONE_NUMBER_LENGTH),
    accountNumber,
    verifiedAccountNumber: accountNumber,
    amount: PAYMENT_AMOUNT,
  };
}
