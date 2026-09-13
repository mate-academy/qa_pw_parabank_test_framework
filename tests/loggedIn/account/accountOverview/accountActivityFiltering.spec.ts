import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import {
  ACTIVITY_PERIODS,
  TRANSACTION_TYPES,
} from '../../../../src/ui/constants/accountOverview';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';

const testParameters = [
  {
    period: ACTIVITY_PERIODS.ALL,

    type: TRANSACTION_TYPES.ALL,
  },

  {
    period: ACTIVITY_PERIODS.JANUARY,

    type: TRANSACTION_TYPES.CREDIT,
  },

  {
    period: ACTIVITY_PERIODS.FEBRUARY,

    type: TRANSACTION_TYPES.DEBIT,
  },

  {
    period: ACTIVITY_PERIODS.MARCH,

    type: TRANSACTION_TYPES.CREDIT,
  },

  {
    period: ACTIVITY_PERIODS.APRIL,

    type: TRANSACTION_TYPES.DEBIT,
  },
];

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

testParameters.forEach(({ period, type }) => {
  test(`User can filter activity by ${period} and ${type}`, async ({
    homePage,
    accountDetailsPage,
    accountOverviewPage,
  }) => {
    await homePage.open();
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.OVERVIEW);
    await accountOverviewPage.clickAccountNumber();
    await accountDetailsPage.assertAccountDetailsAreVisible();
    await accountDetailsPage.assertDefaultActivityFilters();
    await accountDetailsPage.filterActivity(period, type);
  });
});
