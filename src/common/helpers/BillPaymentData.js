import { faker } from "@faker-js/faker";

export function generateBillPaymentData() {
  const account = faker.string.numeric(5);
  return {
    payeeName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode('#####'),
    phone: faker.phone.number('###-###-####'),
    account: account,
    verifyAccount: account,
    amount: faker.number.int({ min: 50, max: 500 }),
  };
}
