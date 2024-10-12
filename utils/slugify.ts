// utils/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/ /g, "-"); // Remplace les espaces par des tirets
}
