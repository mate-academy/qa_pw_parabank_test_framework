import { faker } from '@faker-js/faker';

const PHONE_NUMBER_LENGTH = 10;

export function createContactData() {
  return {
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.string.numeric(PHONE_NUMBER_LENGTH),
  };
}
