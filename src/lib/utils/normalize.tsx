export function normalize(str: string) {
  if (typeof str !== "string") return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f,.]/g, "")
    .toLowerCase();
}
