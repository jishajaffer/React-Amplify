export const categories = [
  "New Joiners",
  "COVID-19",
  "Business Update",
  "Summercamp"
];

export function getCategories() {
  return categories.filter(c => c);
}