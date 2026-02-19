export function parseCurrency(value: string): number {

  return Number(
    value
      .replace(/\$/g, "")      // Elimina símbolo $
      .replace(/\./g, "")      // Elimina separadores de miles
      .replace(",", ".")       // Convierte coma decimal a punto
      .trim()
  );
}

/**
 * Convierte un string de moneda a número.
 * Soporta formatos como:
 * "$ 1.299"
 * "$1.299"
 * "$ 1.299,50"
 */
