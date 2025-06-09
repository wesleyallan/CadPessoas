function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export { isNullish as default, isNullish };
