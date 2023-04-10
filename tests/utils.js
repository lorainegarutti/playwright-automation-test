const logIn = async (credentials, page) => {
  const { username, password } = credentials;

  // used data-test because usually they're added with test purposes - less frequently changed
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
};

const addItemToCart = async (cartItemName, page) => {
  const listItemsDescription = page.locator('.inventory_item_description');

  // clicks on the 'Add to cart' button from the product which name contains 'Bike Light'
  await listItemsDescription
    .filter({ hasText: cartItemName })
    .getByText('Add to cart')
    .click();
};

const fillFormWithPersonalInformation = async (personalInformation, page) => {
  const { firstName, lastName, postalCode } = personalInformation;

  // used data-test because usually they're added with test purposes - less frequently changed
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();
};


const openShoppingCart = async page => {
  await page.locator('#shopping_cart_container').click();
};

const goToCheckoutPage = async page => {
  await page.getByRole('button', { name: 'Checkout' }).click();
};

export {
  logIn,
  addItemToCart,
  fillFormWithPersonalInformation,
  openShoppingCart,
  goToCheckoutPage
};