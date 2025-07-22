import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import { faker } from "@faker-js/faker";
import { PROFILE_UPDATED_MESSAGE } from "../../../src/common/test data/constants";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('user is able to update profile info', async ({
  signUpPage,
  homePage,
}) => {
  const newFirstName = faker.person.firstName();
  const newLastName = faker.person.lastName();
  const newAddress = faker.location.streetAddress();
  const newCity = faker.location.city();
  const newState = faker.location.state();
  const newZipCode = faker.location.zipCode();
  const newPhone = faker.phone.number();

  await allure.severity(`normal`);

  await homePage.goToUpdateContactInfoPage();
  await signUpPage.fillFirstNameField(newFirstName);
  await signUpPage.fillLastNameField(newLastName);
  await signUpPage.fillAddressField(newAddress);
  await signUpPage.fillCityField(newCity);
  await signUpPage.fillStateField(newState);
  await signUpPage.fillZipCodeField(newZipCode);
  await signUpPage.fillPhoneNumberField(newPhone);
  await homePage.clickUpdateProfile();
  await homePage.assertProfileUpdatedMessage(PROFILE_UPDATED_MESSAGE);
});
