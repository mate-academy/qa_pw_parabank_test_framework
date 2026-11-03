import { test } from '../../../_fixtures/fixtures';
import {
  USER_DATA_MAX_LENGTH as MAX_LEN,
  USER_DATA_MIN_LENGTH as MIN_LEN,
} from '../../../../src/common/constants/constraints';
import {
  generateRandomAlphaNumericString as randAlphaNumStr,
  generateRandomAlphabeticString as randAlphaStr,
  generateRandomNumericString as randNumStr,
} from '../../../../src/common/helpers/stringHelpers';

const boundaryOffsets = [-1, 0, 1];


function boundaryValue(field, length) {
  if (field === 'phone' || field === 'zipCode') {
    return randNumStr(length);
  }

  if (field === 'password') {
    const prefix = 'Aa1!';
    if (length <= prefix.length) {
      return prefix.slice(0, length);
    }
    return `${prefix}${randAlphaNumStr(length - prefix.length)}`;
  }

  if (field === 'address' || field === 'username') {
    return randAlphaNumStr(length);
  }

  return randAlphaStr(length);
}

const lengthBoundaries = Object.keys(MAX_LEN).flatMap(field => {
  const limits = [MIN_LEN[field], MAX_LEN[field]];

  const lengths = [
    ...new Set(
      limits.flatMap(limit => boundaryOffsets.map(offset => limit + offset)),
    ),
  ].filter(length => length > 0);

  return lengths.map(length => ({
    field,
    value: boundaryValue(field, length),
    valid: length >= MIN_LEN[field] && length <= MAX_LEN[field],
    name: `${field} of ${length} chars`,
  }));
});

test.describe('Sign Up with field length boundaries', () => {
  lengthBoundaries.forEach(({ field, value, valid, name }) => {
    test(`User should ${valid ? '' : 'not '}be able to sign up with ${name}`, async ({
      registerPage,
      user,
      logger
    }) => {
      logger.info(`Testing field '${field}' with value '${value}'`);
      
      await registerPage.open();
      await registerPage.fillSignUpFormFields({ ...user, [field]: value });
      await registerPage.clickRegisterButton();

      if (valid) {
        const username = field === 'username' ? value : user.username;
        await registerPage.assertAccountCreated(username);
        return;
      }

      await registerPage.assertRegistrationRejected(field);
    });
  });
});
