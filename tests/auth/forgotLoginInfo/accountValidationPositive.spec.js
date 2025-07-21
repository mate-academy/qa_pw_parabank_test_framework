import { test } from "../../_fixtures/fixtures";
import { signUpUser } from '../../../src/common/helpers/signUpUser'
import { LOGIN_LOCATED_INFO } from "../../../src/common/test data/constants";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Customer lookup` flow test', async ({
  user,
  customerLookupPage
}) => {
  await customerLookupPage.open()
  await customerLookupPage.fillFirstNameField(user.firstname);
  await customerLookupPage.fillLastNameField(user.lastname);
  await customerLookupPage.fillAddressField(user.address);
  await customerLookupPage.fillCityField(user.city);
  await customerLookupPage.fillStateField(user.state);
  await customerLookupPage.fillZipCodeField(user.zip);
  await customerLookupPage.fillSSNField(user.ssn);
  await customerLookupPage.clickFindMyLoginInfoButton();

  await customerLookupPage.assertLoginLocatedInfoText(LOGIN_LOCATED_INFO);
  await customerLookupPage.assertUsernameIsVisible(user.username);
  await customerLookupPage.assertPasswordIsVisible(user.password);
});
