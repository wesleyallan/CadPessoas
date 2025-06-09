// This prevents the multiplying system of the javascript to break precision multiplications
export function safeMultiply(a: number, b: number) {
  const commonMultiplier = 1000000;

  a *= commonMultiplier;
  b *= commonMultiplier;

  return (a * b) / (commonMultiplier * commonMultiplier);
}
