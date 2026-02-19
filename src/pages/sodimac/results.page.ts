import { type Page, expect } from "@playwright/test";

export class ResultsPage {
  constructor(private page: Page) {}

  private get products() {
    // Selector semántico más estable basado en schema.org
    return this.page.locator('[itemtype="http://schema.org/Offer"]');
  }

  async selectFirstAvailableProduct() {

    // Espera a que al menos exista un producto visible
    await expect(this.products.first()).toBeVisible({ timeout: 15000 });

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {

      const product = this.products.nth(i);

      const outOfStock = await product
        .locator("text=Sin stock")
        .count();

      if (outOfStock === 0) {

        // Sincroniza click con navegación al detalle
        await Promise.all([
          this.page.waitForURL(/\/product\//), 
          product.click()
        ]);

        return;
      }
    }

    throw new Error("No se encontraron productos disponibles");
  }

  async selectSecondAvailableProduct() {

    await expect(this.products.first()).toBeVisible({ timeout: 15000 });

    const count = await this.products.count();
    let found = 0;

    for (let i = 0; i < count; i++) {

      const product = this.products.nth(i);

      const outOfStock = await product
        .locator("text=Sin stock")
        .count();

      if (outOfStock === 0) {
        found++;

        if (found === 2) {

          // Sincroniza navegación correctamente
          await Promise.all([
            this.page.waitForURL(/\/product\//),
            product.click()
          ]);

          return;
        }
      }
    }

    throw new Error("No se encontró un segundo producto disponible");
  }

  async goBackToResults() {

    // Sincroniza navegación al volver
    await Promise.all([
      this.page.waitForURL(/search/),
      this.page.goBack()
    ]);

    // Espera a que productos vuelvan a estar visibles
    await expect(this.products.first()).toBeVisible({ timeout: 15000 });
  }
}

