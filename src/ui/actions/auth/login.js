export async function fillLoginForm(homePage, { username, password }) {
  await homePage.step('Fill login form', async () => {
    await homePage.fillUsername(username);
    await homePage.fillPassword(password);
  });
}
