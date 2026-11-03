import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'index.htm';
    this.pageName = 'Home page';
  }
}
