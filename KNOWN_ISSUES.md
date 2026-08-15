# Known Issues

This suite tests a live, third-party demo application (parabank.parasoft.com)
maintained by someone else, with no dev/QA feedback loop on our side and no real
issue tracker to file against. It is genuinely unstable and keeps changing on its
own schedule — something that passed reliably yesterday can behave differently
today with no code change here (see BUG-4 for a concrete example: the same
"Open New Account" flow settled on two different starting balances across
different runs). This file plays the role of that missing tracker instead: bugs
found while writing tests are logged here, ticket-style, each linked to the test
that documents or guards it.

## Bugs found in the application under test

### BUG-1 — Request Loan: zero amount crashes the server

**Severity:** High · **Status:** Reproduces consistently

Submitting a loan request with `amount = 0` doesn't return a graceful "Denied"
result — the server throws an unhandled error and shows a generic `Error!` page
("An internal error has occurred and has been logged.") instead.

Guarded by: [`tests/account/negative/requestLoan.spec.js`](tests/account/negative/requestLoan.spec.js)
— `should not approve a loan request with a zero loan amount`

---

### BUG-2 — Transfer Funds: no insufficient-funds validation

**Severity:** High · **Status:** Reproduces consistently

Transferring more than an account's available balance is accepted without any
validation — the account is left with a negative balance instead of the transfer
being rejected. Confirmed via the actual server response
(`POST .../services_proxy/bank/transfer` returns `200` with
`"Successfully transferred..."` regardless of balance).

Guarded by: [`tests/account/negative/transferFunds.spec.js`](tests/account/negative/transferFunds.spec.js)
— `should not transfer more funds than the source account holds`

---

### BUG-3 — Update Contact Info: intermittent client-side crash on submit

**Severity:** Medium · **Status:** Intermittent (observed roughly 1 in 4 runs)

Clicking "Update Profile" occasionally throws an uncaught exception in the app's
own client-side JavaScript:

```
TypeError: Cannot read properties of null (reading 'ssn')
    at submit (https://parabank.parasoft.com/parabank/updateprofile.htm:251:44)
```

This silently aborts the submission — the form just sits there, no success page,
no error message. Not something test code can wait around, since the page's own
script has already crashed by that point.

Too intermittent to assert against with `test.fail()` — the suite-wide retry
(`playwright.config.js`, `retries: 1`) helps but isn't a real fix: it has been
observed to fail two attempts in a row (crash on both the original run and the
retry). Since the failure happens inside the app's own script before our code
gets a chance to do anything, there's currently no reliable workaround on the
test side — we're stuck waiting on whoever maintains the demo to fix it.

---

### BUG-4 — Open New Account: starting balance is not a stable constant

**Severity:** Low · **Status:** Intermittent, unexplained

A freshly opened account has settled at both $90 and $100 across different runs
with no change on our side — confirmed by opening accounts with zero transfers
involved. Root cause unknown (there's no client-side deposit-amount field to
inspect; likely server-side).

Not a bug asserted against directly — instead `openTrackedAccounts` (see
[`src/ui/interfaces/account.js`](src/ui/interfaces/account.js)) reads each
account's real starting balance off the UI right after opening it, rather than
assuming a fixed value.

---

### BUG-5 — Request Loan: response date is inconsistently zero-padded

**Severity:** Cosmetic · **Status:** Confirmed in the page's own JS

The date shown in the loan result (`Date: MM-DD-YYYY`) is built by the page's
own client-side `format()` function, which zero-pads the month but not the day
(e.g. `08-5-2026` instead of `08-05-2026` for single-digit days) — unlike this
repo's own `todayFormatted()` helper, which pads both. Not asserted against in
our tests (`assertLoanApproved`/`assertLoanDenied` don't check that field's
exact text), noted here as a genuine inconsistency spotted while reading the
page's source before writing Request Loan coverage.

---

### RESOLVED — Find Transactions: malformed row on empty results

**Severity:** was Medium · **Status:** No longer reproduces

Earlier in development, a date search with no matching transactions returned one
malformed row (`NaN-NaN-NaN` / `undefined`) instead of an empty results table.
This was documented via `test.fail()` for a while; a later run showed the tests
passing normally ("Expected to fail, but passed"), so the underlying bug appears
to have been fixed upstream. `test.fail()` was removed once this was confirmed.

Was guarded by: [`tests/account/positive/findTransactions.spec.js`](tests/account/positive/findTransactions.spec.js)
— `should return no transactions for a date with no matches` /
`...for a date range with no matches`

---

### INVESTIGATED, NOT A BUG — Request Loan: extreme amount/down-payment ratios

Two scenarios (down payment far exceeding the loan amount; loan amount far
exceeding the down payment) initially looked like a missing-validation bug during
manual exploration — both appeared to always return "Approved". Re-tested with
the automated suite and confirmed the server actually returns a proper "Denied"
result with a specific message in both cases:

- down payment far exceeding the amount → *"You do not have sufficient funds for
  the given down payment."*
- amount far exceeding the down payment → *"We cannot grant a loan in that amount
  with your available funds."*

The original manual observations were simply unreliable single data points.
Covered as regular (non-`test.fail()`) negative tests in
[`tests/account/negative/requestLoan.spec.js`](tests/account/negative/requestLoan.spec.js).

---

### INVESTIGATED, NOT A BUG — Update Contact Info: customer ID looked hardcoded

While building this feature, the `getCustomer()`/`submit()` AJAX calls appeared
to always reference the same customer ID, which looked like it might be a
hardcoded-ID bug (one user's request touching another user's data). Compared
two real, simultaneously logged-in sessions side by side and confirmed each
request actually used its own session's real customer ID — the endpoint works
correctly, it just wasn't obvious from a single session alone.

## Difficulties encountered while writing this suite, and how they were addressed

- **Server time zone mismatch broke date-based assertions.** Computing "today"
  locally (`new Date()`) doesn't reliably match the date the server actually
  stamps on a transaction — the test machine and the server can be in different
  time zones, and around midnight the two can disagree on what day it is. Fixed
  by reading the actual date the server recorded directly from the UI after
  creating a transaction, instead of computing it locally.
- **DOM-based "this should NOT be visible" assertions are unreliable for
  same-page AJAX submissions.** Transfer Funds submits via AJAX without changing
  the URL; asserting `not.toBeVisible()` on a success heading can pass simply
  because the page hasn't finished rendering yet — a false negative, not proof
  the action was rejected. Fixed by waiting for the actual network response
  (`page.waitForResponse`) and asserting on its body directly, instead of racing
  the DOM.
- **Round-robin transfer helper broke with only one account.**
  `accounts[i % accounts.length]` collapses to the same account when there's
  only one, turning a "transfer" into a same-account transfer with undefined
  real-world semantics. Added an explicit guard requiring at least two accounts.
- **`allure generate` doesn't cleanly overwrite an existing report.**
  Regenerating the HTML report on top of an already-existing `allure-report`
  directory silently kept only a couple of stale entries instead of the full
  result set. Fixed by deleting the output directory before every
  `allure:generate` run.
- **Allure results were getting wiped mid-suite once retries were enabled.** The
  results-cleanup step was a worker-scoped fixture, and Playwright spins up a
  fresh worker process for every retry — so a single retry anywhere in the run
  would wipe out every result collected before it. Moved the cleanup to
  `globalSetup`, which runs exactly once per invocation regardless of workers or
  retries.
- **Two different transactions can share the same description, making amount
  the only way to tell them apart.** The deposit and the "received" transfer
  are both labeled "Funds Transfer Received". After switching the deposit's
  amount to a dynamically-read value, the exclusion checks that used the old
  static (now-undefined) amount silently fell back to matching by description
  only — which made a genuinely-present "received" row get misidentified as
  the excluded deposit row. Fixed by carrying the real dynamic amount into
  every place `DEPOSIT_TRANSACTION` is used, including exclusion lists, not
  just the "this is the one we expect to find" assertions.
- **The demo server itself is genuinely, if intermittently, unstable** — slow
  responses, occasional server errors unrelated to any of the above. One
  concrete episode: login, registration, and Update Contact Info all started
  failing simultaneously with a generic 500 (Cloudflare-fronted) for several
  hours, then recovered on their own with no code changes on our side —
  confirmed as a genuine outage rather than a regression by cross-referencing
  failures across otherwise-unrelated features. `retries: 1` in
  `playwright.config.js` absorbs the shorter, more common instances of this
  without masking real regressions (a test still has to fail twice in a row to
  be reported as failing).
