export const categories = [
  "New Joiners",
  "COVID-19",
  "Business Update",
  "Summercamp"
];

export function getCategories() {
  return categories.filter(c => c);
}

export function getCategoriesForSelect(){
  const selectCategories = [{id: 1, name: categories[0]},
  {id: 2, name: categories[1]},
  {id: 3, name: categories[2]},
  {id: 4, name: categories[3]}
]
return selectCategories;
}