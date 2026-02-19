import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";
import { cartContainsProduct } from "../support/utils/cart.utils.js";
import { parseCurrency } from "../support/utils/currency.utils.js";


Given("el usuario ingresa a la tienda online de Sodimac", async function (this: CustomWorld) {
  await this.homePage.navigate();
});

When("el usuario busca artículos de playa", async function (this: CustomWorld) {
  await this.homePage.searchBeachItems();
});

When("selecciona el primer producto disponible", async function (this: CustomWorld) {
  await this.resultsPage.selectFirstAvailableProduct();
  const { name, priceText } = await this.productPage.getSelectedProductData();
  this.firstProductName = name;

  // Convierte precio string a número real
  this.firstProductPrice = parseCurrency(priceText);
});


When("lo agrega al carrito", async function (this: CustomWorld) {
  await this.productPage.addToCart();
});

When("regresa al listado de productos", async function (this: CustomWorld) {
  await this.resultsPage.goBackToResults();
});

When("selecciona un segundo producto distinto", async function (this: CustomWorld) {
  await this.resultsPage.selectSecondAvailableProduct();
  const { name, priceText } = await this.productPage.getSelectedProductData();
  this.secondProductName = name;

  // Convierte precio string a número real
  this.secondProductPrice = parseCurrency(priceText);
});

When("navega al carrito de compras", async function (this: CustomWorld) {
  await this.cartPage.openCart();
});

Then(
  "el carrito debe contener ambos productos seleccionados", async function (this: CustomWorld) {
    const items = await this.cartPage.getCartItems();
    expect(cartContainsProduct(items, this.firstProductName)).toBeTruthy();
    expect(cartContainsProduct(items, this.secondProductName)).toBeTruthy();
  }
);

Then("cada producto debe tener cantidad 1", async function (this: CustomWorld) {
  const quantities = await this.cartPage.getItemQuantities();
  // Valida que existan exactamente 2 productos
  expect(quantities.length).toBe(2);

  // Valida que cada uno tenga cantidad 1
  quantities.forEach((quantity: number) => {
    expect(quantity).toBe(1);
  });
});

Then("el precio total debe ser consistente con precios y cantidades", async function (this: CustomWorld) {
  const quantities = await this.cartPage.getItemQuantities();
  const totalText = await this.cartPage.getTotalPrice();

   // Guarda para satisfacer TypeScript y evitar acceso undefined
  expect(quantities.length).toBeGreaterThanOrEqual(2);
  const [q1, q2] = quantities;
  if (q1 === undefined || q2 === undefined) {
    throw new Error("No se pudieron obtener las cantidades de ambos productos.");
  }

  const actualTotal = parseCurrency(totalText);
  const expectedTotal = (this.firstProductPrice * q1) + (this.secondProductPrice * q2);

  expect(actualTotal).toBe(expectedTotal);
});


Then("se captura una evidencia del detalle del carrito", async function (this: CustomWorld) {
  await this.cartPage.takeScreenshot();
});
