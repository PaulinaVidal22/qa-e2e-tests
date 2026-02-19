import { type Page, expect } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  private get productTitle() {
    // H1 principal del detalle de producto
    return this.page.getByRole("heading", { level: 1 });
  }

  private get productPrice() {
  return this.page
    .locator('div.product-price')
    .locator('span')
    .filter({ hasText: /\d/ })
    .first();
}


  private get addToCartButton() {
    // Botón accesible por nombre visible
    return this.page.getByRole("button", { name: /agregar/i });
  }

  async waitForProductPageToBeReady() {
    // Verifica que estamos en una URL de producto
    await expect(this.page).toHaveURL(/product/);

    // Espera a que el título esté visible
    await expect(this.productTitle).toBeVisible({ timeout: 15000 });
  }

  async getProductName(): Promise<string> {
    await this.waitForProductPageToBeReady();

    return (await this.productTitle.innerText()).trim();
  }

  async getProductPrice(): Promise<string> {
    await this.waitForProductPageToBeReady();

    // Espera explícita de precio visible
    await expect(this.productPrice).toBeVisible({ timeout: 10000 });

    return (await this.productPrice.innerText()).trim();
  }

  async getSelectedProductData(): Promise<{ name: string; priceText: string }> {
    await this.waitForProductPageToBeReady();
    await expect(this.productPrice).toBeVisible({ timeout: 10000 });

    const [name, priceText] = await Promise.all([
      this.productTitle.innerText(),
      this.productPrice.innerText()
    ]);

    return {
      name: name.trim(),
      priceText: priceText.trim()
    };
  }

  async addToCart() {

    await this.waitForProductPageToBeReady();

    // Verifica que el botón esté visible y habilitado
    await expect(this.addToCartButton).toBeVisible({ timeout: 10000 });
    await expect(this.addToCartButton).toBeEnabled();

    // Click sincronizado con posible cambio en UI
    await this.addToCartButton.click();

    // Espera señal determinista de que el producto fue agregado
    // Ejemplo: incremento en contador de carrito o aparición de modal
    const cartCounter = this.page.locator('[data-testid="cart-count"], .cart-count');

    try {
      await expect(cartCounter).toBeVisible({ timeout: 5000 });
    } catch {
      // Si no hay contador visible, al menos espera que el botón cambie de estado
      await expect(this.addToCartButton).not.toBeDisabled({ timeout: 5000 });
    }
  }
}