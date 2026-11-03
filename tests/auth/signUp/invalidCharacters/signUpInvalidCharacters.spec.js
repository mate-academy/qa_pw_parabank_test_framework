import { test } from '../../../_fixtures/fixtures';
import { USER_DATA_MAX_LENGTH as MAX_LEN } from '../../../../src/common/constants/constraints';
import {
  generateRandomAlphaNumericString as randAlphaNumStr,
  generateRandomAlphabeticString as randAlphaStr,
  generateRandomNumericString as randNumStr,
} from '../../../../src/common/helpers/stringHelpers';

function withLastChar(value, char) {
  return `${value.slice(0, -1)}${char}`;
}

function testRejectedSignUp(name, field, value) {
  test(`User should not be able to sign up with ${name}`, async ({
    registerPage,
    user,
    logger,
  }) => {
    logger.info(`Testing field '${field}' with value '${value}'`);

    await registerPage.open();
    await registerPage.fillSignUpFormFields({
      ...user,
      [field]: value,
      ...(field === 'password' ? { confirmPassword: value } : {}),
    });
    await registerPage.clickRegisterButton();
    await registerPage.assertRegistrationRejected(field);
  });
}

function testAcceptedSignUp(name, field, value) {
  test(`User should be able to sign up with ${name}`, async ({
    registerPage,
    user,
    logger,
  }) => {
    logger.info(`Testing field '${field}' with value '${value}'`);

    await registerPage.open();
    await registerPage.fillSignUpFormFields({ ...user, [field]: value });
    await registerPage.clickRegisterButton();
    await registerPage.assertAccountCreated(user.username);
  });
}

const nameFields = ['firstName', 'lastName'];
const numericFields = ['phone', 'zipCode'];

const nonLetters = [
  { kind: 'a digit', char: '1' },
  { kind: 'a symbol', char: '!' },
  { kind: 'a space', char: ' ' },
];

const nameInvalidChars = nonLetters.filter(({ char }) => char !== ' ');
const cityInvalidChars = nameInvalidChars;

const nonDigits = [
  { kind: 'a letter', char: 'a' },
  { kind: 'a symbol', char: '!' },
  { kind: 'a space', char: ' ' },
];

const usernameChars = [
  { kind: "'!'", char: '!' },
  { kind: 'a space', char: ' ' },
  { kind: "'-'", char: '-' },
  { kind: "'@'", char: '@' },
  { kind: "'.'", char: '.' },
];

const passwordCases = [
  { name: 'password without an uppercase letter', value: 'aa1!aaaa' },
  { name: 'password without a lowercase letter', value: 'AA1!AAAA' },
  { name: 'password without a digit', value: 'Aa!aaaaa' },
  { name: 'password without a special character', value: 'Aa1aaaaa' },
  { name: "password with disallowed character '#'", value: 'Aa1!aaa#' },
];

function letterBase(field) {
  return randAlphaStr(Math.min(6, MAX_LEN[field]));
}

function numericBase(field) {
  if (field === 'phone') {
    return randNumStr(10);
  }

  return randNumStr(MAX_LEN[field]);
}

test.describe('Sign Up with invalid characters', () => {
  test.describe('Username', () => {
    usernameChars.forEach(({ kind, char }) => {
      testRejectedSignUp(
        `username with ${kind}`,
        'username',
        withLastChar(randAlphaNumStr(8), char),
      );
    });
  });

  test.describe('Password', () => {
    passwordCases.forEach(({ name, value }) => {
      testRejectedSignUp(name, 'password', value);
    });
  });

  test.describe('Letter fields', () => {
    nameFields.flatMap(field =>
      nameInvalidChars.map(({ kind, char }) => ({
        field,
        value: withLastChar(letterBase(field), char),
        name: `${field} with ${kind}`,
      })),
    ).forEach(({ field, value, name }) => {
      testRejectedSignUp(name, field, value);
    });

    nonLetters.forEach(({ kind, char }) => {
      testRejectedSignUp(
        `state with ${kind}`,
        'state',
        withLastChar(letterBase('state'), char),
      );
    });

    cityInvalidChars.forEach(({ kind, char }) => {
      testRejectedSignUp(
        `city with ${kind}`,
        'city',
        withLastChar(letterBase('city'), char),
      );
    });
  });

  test.describe('Numeric fields', () => {
    numericFields.flatMap(field =>
      nonDigits.map(({ kind, char }) => ({
        field,
        value: withLastChar(numericBase(field), char),
        name: `${field} with ${kind}`,
      })),
    ).forEach(({ field, value, name }) => {
      testRejectedSignUp(name, field, value);
    });
  });
});

const allowedNameChars = [
  { kind: "an apostrophe", value: "O'Brien" },
  { kind: 'a hyphen', value: 'Anne-Marie' },
  { kind: 'a space', value: 'Mary Ann' },
];

test.describe('Sign Up with characters allowed in names', () => {
  nameFields.forEach(field => {
    allowedNameChars.forEach(({ kind, value }) => {
      testAcceptedSignUp(`${field} with ${kind}`, field, value);
    });
  });
});

test.describe('Sign Up with a space in the city', () => {
  testAcceptedSignUp('city with a space', 'city', 'New York');
});
