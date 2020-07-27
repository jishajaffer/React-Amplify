export const categories = [
  {
    "categoryID": 1,
    "categoryName": "Summercamp"
  },
  {
    "categoryID": 2,
    "categoryName": "COVID-19"
  },
  {
    "categoryID": 3,
    "categoryName": "New Joiners"
  },
  {
    "categoryID": 4,
    "categoryName": "Business Update"
  },
];

export function getCategories() {
  return categories.filter(c => c);
}