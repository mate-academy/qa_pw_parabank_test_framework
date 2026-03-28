import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.locator('input[value="Log In"]');
    this.errorMessage = page.locator('p.error');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/index.htm');
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async assertLoginErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  async assertLoginSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/overview/);
  }
}
