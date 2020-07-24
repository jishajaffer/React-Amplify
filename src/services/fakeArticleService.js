const articles = [
  {
    id: "1",
    title: "Sample Title 1",
    image: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22538%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20538%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1737720013b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A27pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1737720013b%22%3E%3Crect%20width%3D%22538%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22178%22%20y%3D%22124.5%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    content:
      "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse",
    category: "Summercamp",
    highlighted: true,
    timestamp: 1595498106
  },
  {
    id: "2",
    title: "Sample Title 2",
    image: "",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    category: "COVID-19",
    highlighted: false,
    timestamp: 1595498129
  },
  {
    id: "3",
    title: "Sample Title 3",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category: "COVID-19",
    highlighted: false,
    timestamp: 1595498044
  },
  {
    id: "4",
    title: "Sample Title 4",
    image: "https://static-37.sinclairstoryline.com/resources/media/9c82c7a0-0963-4b57-a4a8-bc4a9cf5d0b0-large16x9_GettyImages1134307248.jpg?1587503201714",
    content: "New people have joined AND!",
    category: "New Joiners",
    highlighted: false,
    timestamp: 1595498000
  },
];

export function getArticlesById(id) {
  return articles.find((article) => parseInt(article.id) === parseInt(id));
}

export function getArticles() {
  return articles.filter(a => a);
}

export function getArticlesByCategory(category) {
  return articles.filter((article) => article.category === category);
}

export function getHighlightedArticles(articles) {
  return articles.filter((article) => article.highlighted);
}

export function getNonHighlightedArticles(articles) {
  return articles.filter((article) => !article.highlighted);
}


