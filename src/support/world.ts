import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { Browser, Page } from "@playwright/test";
import { HomePage } from "../pages/sodimac/home.page.js";
import { ResultsPage } from "../pages/sodimac/results.page.js";
import { ProductPage } from "../pages/sodimac/product.page.js";
import { CartPage } from "../pages/sodimac/cart.page.js";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  homePage!: HomePage;
  resultsPage!: ResultsPage;
  productPage!: ProductPage;
  cartPage!: CartPage;

  // Variables compartidas entre steps
  firstProductName!: string;
  firstProductPrice!: number;

  secondProductName!: string;
  secondProductPrice!: number;
}

setWorldConstructor(CustomWorld);
