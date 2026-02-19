export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.\.\.$/, "") // elimina "..."
    .trim();
}

export function matchesProduct(
  cartName: string,
  expectedName: string
): boolean {
  const cart = normalizeText(cartName);
  const expected = normalizeText(expectedName);

  return expected.includes(cart) || cart.includes(expected);
}

export function cartContainsProduct(
  items: string[],
  expectedName: string
): boolean {
  return items.some(item =>
    matchesProduct(item, expectedName)
  );
}
