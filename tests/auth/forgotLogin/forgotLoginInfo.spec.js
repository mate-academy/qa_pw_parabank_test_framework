import { test } from '../../_fixtures/fixtures';
import { ForgotLoginInfo } from '../../../src/ui/pages/auth/ForgotLoginInfo';

import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let forgotLoginInfo;


test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);

  forgotLoginInfo = new ForgotLoginInfo(pages[1]);

});

test('Successful take `Forgot Login Info` flow test', async ({ user }) => {

  await forgotLoginInfo.open();
  await forgotLoginInfo.fillFirstNameField(user.firstName);
  await forgotLoginInfo.fillLastNameField(user.lastName);
  await forgotLoginInfo.fillAddressStreetField(user.street);
  await forgotLoginInfo.fillAddressCityField(user.city);
  await forgotLoginInfo.fillAddressStateField(user.state);
  await forgotLoginInfo.fillAddressZipCodeField(user.zipCode);
  await forgotLoginInfo.fillSsnField(user.ssn);



  await forgotLoginInfo.clickFindMyLoginInfoButton();

  await forgotLoginInfo.assertLoginWasLocatedIsVisible();
 


});