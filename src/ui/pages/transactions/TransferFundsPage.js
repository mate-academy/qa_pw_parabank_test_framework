import{expect, testStep} from '../../../common/helpers/pwHelpers';


export class TransferFundsPage{
 constructor (page){
    this.page = page;
    this.amountField = page.locator('#amount');
    this.fromAccountIdDropdown = page.locator('#fromAccountId');
    this.toAccountIdDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.succsessTransferText = page.getByRole('heading', { name: 'Transfer Complete!' });
    this.transferResult = page.locator('#showResult');
 }

 async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('/parabank/transfer.htm');
    });
  }

  async inputAmountField(amount){
    await this.step(`Fill the 'Amount' field`, async() => {
      await this.amountField.fill(amount);
    });
  }
  async selectToAccountDropdown(accountId){
    await this.step(`Select destination account`, async() => {
      await this.toAccountIdDropdown.selectOption({ index: 1 });
    });
  }

  async getAccountId() {
    return await this.step(`Get selected source account id`, async() => {
      return (await this.fromAccountIdDropdown.inputValue()).trim();
    });
  }
  async clickTransferButton(){
    await this.step(`Click 'Transfer ' Button`, async() => {
      await this.transferButton.click();
    });
  }
  // async assertSuccsessTransferTextVisible(){
  //   await this.step(`Veify 'Transfer Complete!' text is visible`, async() => {
  //     await expect(this.succsessTransferText).toBeVisible();
  //   });

  // }
//    async selectToAccountId(accountId) {
//     await this.step(
//       `Select to account 
// ID ${accountId} from dropdown`,
//       async () => {
//         await this.toAccountIdDropdown
//           .locator('option')
//           .first()
//           .waitFor({ state: 'attached' });
//         await this.toAccountIdDropdown.selectOption(accountId);
//       },
//     );
//   }

  async assertSuccsessTransferTextVisible(fromAccountId, toAccountId, amount) {
    await this.step(
      `Assert that transfer result 
      contains correct from account, to account and amount`,
      async () => {
        await expect(this.transferResult).toContainText('Transfer Complete!');
        const normalizedAmount = Number(amount).toFixed(2);
        await expect(this.transferResult).toContainText(
          new RegExp(`\\$${normalizedAmount}\\s+has been transferred from account #${fromAccountId} to account #${toAccountId}\\.`),
        );
      },
    );
  }


}