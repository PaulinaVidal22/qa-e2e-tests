import { type Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    // Navega esperando solo a que el DOM esté cargado (más estable que networkidle)
    await this.page.goto("https://www.sodimac.com.uy/", {
      waitUntil: "domcontentloaded",
      timeout: 30000 // timeout explícito 
    });

    // Espera un elemento clave que indique que la página está lista
    const searchInput = this.page.getByRole('textbox');
    await expect(searchInput).toBeVisible({ timeout: 15000 });

    // Maneja el popup de cookies si aparece
    await this.handleCookiesIfPresent();
  }

  async handleCookiesIfPresent() {
    // Intenta localizar botón de aceptación de cookies
    const acceptButton = this.page.getByRole("button", { name: /aceptar/i }).first();

    // Si aparece dentro del timeout, lo cierra
    if (await acceptButton.isVisible({ timeout: 1200 }).catch(() => false)) {
      await acceptButton.click();

    // try {
    //   // Espera breve para detectar si aparece
    //   await acceptButton.waitFor({ state: "visible", timeout: 3000 });

    //   // Click solo si realmente es visible
    //   await acceptButton.click();
    // } catch {
    //   // Si no aparece, no hacemos nada (flujo normal)
    // }
    }
  }

  async searchBeachItems() {
    const searchInput = this.page.getByRole('textbox');

    // Espera a que el buscador esté visible antes de interactuar
    await expect(searchInput).toBeVisible();
    // await expect(searchInput).toBeVisible({ timeout: 10000 });

    await searchInput.fill("silla de playa");
    //await this.page.keyboard.press("Enter");
    await Promise.all([this.page.waitForURL(/search/), searchInput.press("Enter")]);

    // Espera a que aparezcan productos 
    const products = this.page.locator('[itemtype="http://schema.org/Offer"]');
    await expect(products.first()).toBeVisible({ timeout: 15000 });
  }
}
