import { type Page, expect, type Locator } from "@playwright/test";

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ==============
  // Selectores 
  // ==============

  private get goToCartButton(): Locator {
    return this.page.getByRole("button", { name: /ir al carro/i });
  }

  private get cartItems(): Locator {
    return this.page.locator(".fbra_productItem");
  }

  private get itemNames(): Locator {
    return this.page.locator(
      ".fbra_productItem__description__name"
    );
  }

  private get quantityInputs(): Locator {
    return this.page.locator(
      ".fbra_quantitySpinner__quantity"
    );
  }

  // Total general del carrito (ajustado al DOM real)
  private get totalPrice(): Locator {
  return this.page.locator(
    ".fbra_summaryContainer__regularTotal__item__value"
  ).first();
}

  // ==============================
  // Sincronización
  // ==============================

  async openCart(): Promise<void> {
    await expect(this.goToCartButton).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForURL(/carrito|cart/),
      this.goToCartButton.click()
    ]);

    await this.waitForCartToBeReady();
  }

  async waitForCartToBeReady(): Promise<void> {
    await expect(this.page).toHaveURL(/carrito|cart/);

    // Espera que exista al menos un producto
    await expect(this.cartItems.first())
      .toBeVisible({ timeout: 15000 });
  }

  private async ensureCartItemsVisible(): Promise<void> {
    await expect(this.cartItems.first()).toBeVisible();
  }

  // ==============================
  // Lectura de datos (sin asserts)
  // ==============================

  async getCartItems(): Promise<string[]> {
    await this.ensureCartItemsVisible();

    const texts = await this.itemNames.allInnerTexts();

    return texts.map(t => t.trim());
  }

  async getItemQuantities(): Promise<number[]> {
    await this.ensureCartItemsVisible();

    const count = await this.quantityInputs.count();
    const quantities: number[] = [];

    for (let i = 0; i < count; i++) {
      const value = await this.quantityInputs.nth(i).inputValue();
      quantities.push(Number(value));
    }

    return quantities;
  }

  async getTotalPrice(): Promise<string> {
    await this.ensureCartItemsVisible();
    await expect(this.totalPrice).toBeVisible();

    return (await this.totalPrice.innerText()).trim();
  }

  async takeScreenshot(): Promise<void> {
    await this.page.screenshot({
      path: `reports/cart-${Date.now()}.png`,
      fullPage: true
    });
  }
}
