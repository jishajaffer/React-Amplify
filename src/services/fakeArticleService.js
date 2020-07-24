const articles = [
  {
    id: "1",
    title: "Sample Title 1",
    image: "https://picsum.photos/seed/picsum/200/300",
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
    highlighted: true,
    timestamp: 1595498044
  },
  {
    id: "4",
    title: "Sample Title 4",
    image: "https://picsum.photos/seed/picsum/200/300",
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


