// utils/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Supprimer les accents
}
