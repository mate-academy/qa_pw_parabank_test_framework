import { faker } from '@faker-js/faker';
import { generateAddressData } from '../addressData';

export function generateUpdateContactInfoData(logger) {
  const data = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ...generateAddressData(),
  };

  logger?.debug(`Generated update contact info data for "${data.firstName} ${data.lastName}"`);

  return data;
}
