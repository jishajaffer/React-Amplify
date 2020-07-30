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

export function getCategoriesForSelect(){
  const selectCategories = [{id: 1, name: categories[0].categoryName},
    {id: 2, name: categories[1].categoryName},
    {id: 3, name: categories[2].categoryName},
    {id: 4, name: categories[3].categoryName}
  ];
  return selectCategories;
}