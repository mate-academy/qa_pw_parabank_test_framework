import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';

export async function registerUser(page, user, userId = 0) {
  const homePage = new HomePage(page, userId);
  const registerPage = new RegisterPage(page, userId);

  await homePage.open();
  await homePage.clickRegister();
  await registerPage.fillRegistrationForm(user);
  await registerPage.submitRegistration();
}
