import { faker } from '@faker-js/faker';

const TIMESTAMP_SUFFIX_LENGTH = 8;
const RANDOM_SUFFIX_LENGTH = 6;
const PASSWORD_LENGTH = 12;
const PHONE_NUMBER_LENGTH = 10;
const SSN_LENGTH = 9;

export function createRegistrationData() {
  const timestampSuffix = Date.now().toString().slice(-TIMESTAMP_SUFFIX_LENGTH);
  const randomSuffix = faker.string
    .alphanumeric(RANDOM_SUFFIX_LENGTH)
    .toLowerCase();
  const password = faker.internet.password({
    length: PASSWORD_LENGTH,
  });

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.string.numeric(PHONE_NUMBER_LENGTH),
    ssn: faker.string.numeric(SSN_LENGTH),
    username: `qa${timestampSuffix}${randomSuffix}`,
    password,
    confirmPassword: password,
  };
}
