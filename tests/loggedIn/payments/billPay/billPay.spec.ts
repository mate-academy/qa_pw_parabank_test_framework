import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { BillPayPage } from '../../../../src/ui/pages/account/BillPayPage';
import { PAYEE_FIELDS } from '../../../../src/ui/constants/enterPayeeInformation';
import { AccountOverviewPage } from '../../../../src/ui/pages/account/AccountOverviewPage';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';

let homePageUser1;
let billPayPageUser1;
let payeeAccountNumber;

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users }) => {
  await signUpUser(pages[0], users[0]);
  await signUpUser(pages[1], users[1]);

  const homePageUser2 = new HomePage(pages[1], users[1]);
  const accountOverviewPageUser2 = new AccountOverviewPage(pages[1], users[1]);
  await homePageUser2.open();
  await homePageUser2.clickLeftPanel(LEFT_PANEL_BUTTONS.OVERVIEW);

  payeeAccountNumber = await accountOverviewPageUser2.getAccountNumber();

  homePageUser1 = new HomePage(pages[0], users[0]);
  billPayPageUser1 = new BillPayPage(pages[0], users[0]);
});

test(`Successful 'Bill Pay' flow test`, async ({ users, pages }) => {
  const AMOUNT = faker.number.int({ min: 2, max: 100 });
  const SENT_AMOUNT = `$${AMOUNT}.00`;

  await homePageUser1.open();
  await homePageUser1.clickLeftPanel(LEFT_PANEL_BUTTONS.BILL_PAY);
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.NAME,
    users[1].username,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.ADDRESS_STREET,
    users[1].addressStreet,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.ADDRESS_CITY,
    users[1].addressCity,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.ADDRESS_STATE,
    users[1].addressState,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.ADDRESS_ZIP_CODE,
    users[1].addressZipCode,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.PHONE_NUMBER,
    users[1].phoneNumber,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.ACCOUNT_NUMBER,
    payeeAccountNumber,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.VERIFY_ACCOUNT,
    payeeAccountNumber,
  );
  await billPayPageUser1.enterPayeeInformation(
    PAYEE_FIELDS.AMOUNT,
    String(AMOUNT),
  );
  await billPayPageUser1.selectFirstAccount();
  await billPayPageUser1.clickSendPayment();
  await pages[0].waitForTimeout(5000);
  await billPayPageUser1.verifyHeadingIsVisible();
  await billPayPageUser1.verifyPayeeNameIsVisible(users[1].username);
  await billPayPageUser1.verifyBillPaySuccess(SENT_AMOUNT);
});
