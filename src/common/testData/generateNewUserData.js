import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

export function generateNewUserData() {
  const password = faker.internet.password({ length: 12 });

  const uniqueId = randomUUID().replace(/-/g, '').slice(0, 14);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phone: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
    username: `qa${uniqueId}`,
    password,
    confirmPassword: password,
  };
}
