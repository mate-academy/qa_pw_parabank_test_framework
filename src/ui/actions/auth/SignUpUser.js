import { SingUpPage } from '../../pages/singUpPage';
import { HomePage } from '../../pages/HomePage';
import { test } from '../../../../tests/_fixtures/fixtures';

export async function singUpUser(page, user) {
  await test.step(`Sing Up User`, async () => {
    const singUpPage = new SingUpPage(page);
    const homePage = new HomePage(page);

    await singUpPage.open();
    await singUpPage.sibmitSingUpForm(user);
    await homePage.assertYourAccountWasCreated();
  });
}
