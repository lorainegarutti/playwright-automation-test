import { test, expect } from '@playwright/test';

import {
  logIn,
  addItemToCart,
  fillFormWithPersonalInformation,
  openShoppingCart,
  goToCheckoutPage
} from './utils';

const cartItem = {
  name: 'Bike Light',
  price: '9.99',
  tax: '0.80'
};
const credentials = {
  username: 'standard_user',
  password: 'secret_sauce'
};
const personalInformation = {
  firstName: 'Maria',
  lastName: 'Silva',
  postalCode: '14920'
};

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    // arrange
    // navigates to baseUrl
    await page.goto('/');
    await logIn(credentials, page);
  });

  test('adds item to the cart', async ({ page }) => {
    // arrange
    const { name, price } = cartItem;

    // action
    await addItemToCart(name, page);
    await openShoppingCart(page);

    // assertion
    await expect(page.locator('#shopping_cart_container')).toHaveText('1');
    await expect(page.locator('.cart_list')).toContainText(name);
    await expect(page.locator('.cart_list')).toContainText(price);
  });

  test.describe('when there is product added to shopping cart', () => {
    test.beforeEach(async ({ page }) => {
      // arrange
      const { name } = cartItem
      await addItemToCart(name, page);
      await openShoppingCart(page);
      await goToCheckoutPage(page);
    });

    test('proceeds through checkout page with valid information', async ({ page }) => {  
      // arrange
      const { price, tax } = cartItem
      // transforms strings into numbers and then return the sum with two decimal places
      const totalPrice = (parseFloat(price) + parseFloat(tax)).toFixed(2)

      // act 
      await fillFormWithPersonalInformation(personalInformation, page);
      
      // assert
      await expect(page.getByText('SauceCard')).toBeVisible();
      await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
      await expect(page.locator('.summary_info')).toContainText(price);
      await expect(page.locator('.summary_info')).toContainText(tax);
      await expect(page.locator('.summary_info')).toContainText(totalPrice);
    });
    
    test('shows success message when shopping is completed', async ({ page }) => {
      // arrange
      await fillFormWithPersonalInformation(personalInformation, page);
      
      // act
      await page.getByRole('button', { name: 'Finish' }).click();
  
      // assert
      await expect(page.getByText('Checkout: Complete!')).toBeVisible();
      await expect(page.getByText('Thank you for your order!')).toBeVisible();
    })
  });
});
