This repository is for a test automation task using a dummy web application.

## Why Playwright?

- speed to set up and create custom configuration
- easy setup with GitHub Actions
- runtime speed when comparing with other automation frameworks
- possibility of using accessibility selectors to enforce good practices

## Tests
### Manual and planning

- Test scenario: Buy a bike light

- Test cases which will be automated:

Once I'm logged in with a valid user:

1) I should be able to add a bike light to the cart;
2) I should be able to continue after checkout with valid personal data;
3) I should be able to successfully finish the purchase.

- Other test cases:

Once I'm logged in with a valid user and with a bike light added to the cart:

1) I should be able to add more bike lights to the cart;
2) I should be able to add other products, like a backpack;
3) I should not be able to continue after checkout with empty personal data fields;
4) I should be able to have an option to go back on the flow in every checkout page;
5) I should be able to return to home page when I complete my order;
6) Shopping cart should get empty after order is completed.

### Automated and instructions

In order to run automated tests:
- `yarn test:e2e` and all end-to-end tests will be run using playwright (it will run headless by default);
- `PWDEBUG=1 yarn test:e2e` to run all end-to-end tests with debug mode;
- `yarn test:e2e:open:report` to open a browser tab containing html reports;
- Test results (trace when test case fails) will be stored at `results` folder;
- Test html reports will be stored at `reports` folder.

GitHub CI:
- `e2e.yml` will run all end-to-end tests with Playwright in every push or pull request to master branch;
- After each run reports will be uploaded and available up to 7 days;
- All actions are available [here](https://github.com/lorainegarutti/playwright-automation-test/actions). And there is a PR opened to trigger the action, it's available [here](https://github.com/lorainegarutti/playwright-automation-test/actions/runs/4661916925) with artifacts.