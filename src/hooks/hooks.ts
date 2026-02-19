import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "../support/world.js";
import { HomePage } from "../pages/sodimac/home.page.js";
import { ResultsPage } from "../pages/sodimac/results.page.js";
import { ProductPage } from "../pages/sodimac/product.page.js";
import { CartPage } from "../pages/sodimac/cart.page.js";

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  // Lanzar navegador (headless por defecto para mayor velocidad en CI/local)
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false"
  });

  // Crear página
  this.page = await this.browser.newPage();

  // Inicializar Page Objects
  this.homePage = new HomePage(this.page);
  this.resultsPage = new ResultsPage(this.page);
  this.productPage = new ProductPage(this.page);
  this.cartPage = new CartPage(this.page);
});

After(async function (this: CustomWorld) {

  if (this.browser) {
    await this.browser.close();
  }
});
