import { faker } from '@faker-js/faker';
import { generateAddressData } from '../addressData';

export function generateBillPayData(logger) {
  const accountNumber = faker.string.numeric(9);

  const billPayData = {
    name: faker.person.fullName(),
    ...generateAddressData(),
    accountNumber,
    verifyAccountNumber: accountNumber,
    amount: faker.number.int({ min: 10, max: 200 }),
  };

  logger?.debug(`Generated bill pay data for account #${accountNumber}`);

  return billPayData;
}
