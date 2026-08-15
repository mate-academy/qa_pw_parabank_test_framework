import { faker } from '@faker-js/faker';

export function generateAddressData() {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.string.numeric(10),
  };
}
