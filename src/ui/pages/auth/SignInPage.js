import{expect, testStep} from '../../../common/helpers/pwHelpers'

export class SignInPage{
 constructor (page){
 this.page = page;
 this.usernameField = page.locator('input[name="username"]');
 this.passwordField = page.locator('input[name="password"]');
 this.loginButton = page.getByRole('button', { name: 'Log In' });
 this.forgotInfoButton = page.getByRole('link', { name: 'Forgot login info?' });
 this.registerButton = page.getByRole('link', { name: 'Register' });
 this.errorMessage = page.locator('.error');
 }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('/');
    });
  }
   async assertSignInPageIsVisible() {
    await this.step(`Assertion 'Sign In' page is Visible`, async () => {
      await expect(this.page).toHaveURL('/parabank/index.htm');
    });

  }
  async clickOnRegisterButton(){
    await this.step('Go to the `Sign Up` page', async () =>{
    await this.registerButton.click();
    });
  }
  async clickOnForgotInfoButton(){
    await this.step('Go to the `Recovery info` page', async () =>{
    await this.forgotInfoButton.click();
    });
  }
  async clickOnLogInButton(){
    await this.step('Click on the `Login` button', async () =>{
    await this.loginButton.click();
    });
  }
async fillUsernameField(username){
    await this.step('Fill `Username` field', async () =>{
    await this.usernameField.fill(username);
    });
  }
async fillPasswordField(password){
    await this.step('Fill `Password` field', async () =>{
    await this.passwordField.fill(password);
    });
  }

  async assertErrorMessageContainsText(messageText){
        await this.step (`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });

}
}