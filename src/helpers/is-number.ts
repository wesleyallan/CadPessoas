function isNumber(value: unknown): value is number {
   return typeof value === "number" && value - value === 0;
}

export { isNumber, isNumber as default };
