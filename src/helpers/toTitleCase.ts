export function toTitleCase(value: string): string {
  if (!value || typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
