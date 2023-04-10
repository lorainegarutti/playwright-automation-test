import { test, expect } from '@playwright/test';

import {
  logIn,
  addItemToCart,
  fillFormWithPersonalInformation,
  openShoppingCart,
  goToCheckoutPage
} from './utils';

const cartItemName = 'Bike Light';
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
    // action
    await addItemToCart(cartItemName, page);
    await openShoppingCart(page);

    // assertion
    expect(page.locator('#shopping_cart_container')).toHaveText('1');
    expect(page.locator('.cart_list')).toContainText(cartItemName);
  });

  test.describe('when there is product added to shopping cart', () => {
    test.beforeEach(async ({ page }) => {
      // arrange
      await addItemToCart(cartItemName, page);
      await openShoppingCart(page);
      await goToCheckoutPage(page);
    });

    test('proceeds through checkout page with valid information', async ({ page }) => {  
      // act 
      await fillFormWithPersonalInformation(personalInformation, page);
      
      // assert
      await expect(page.getByText('Payment Information')).toBeVisible();
      await expect(page.getByText('Shipping Information')).toBeVisible();
      await expect(page.getByText('Price Total')).toBeVisible();
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
