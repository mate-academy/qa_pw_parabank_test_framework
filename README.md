# Parabank Test Automation Framework

This repository contains a **Playwright-based test automation framework** for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) application.  
The framework includes:

- **Page Object Model** (POM) with actions and page classes  
- **Fixtures** for Auth, Account, and User Management tests  
- **Allure reporting** with proper parentSuite → suite → subSuite hierarchy  
- **Parameterized tests** and reusable helpers  
- Logging with a custom **Logger** class

---

## 🛠 Prerequisites

- Node.js >= 18  
- npm >= 9  
- Git  

Clone the repository:

```bash
git clone <your-repo-url>
cd qa_pw_parabank_test_framework
