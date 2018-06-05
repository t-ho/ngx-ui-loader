/**
 * Coerce a value (string) to a number
 * @param value
 * @param fallbackValue
 */
export function coerceNumber(value, fallbackValue): number {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
}
