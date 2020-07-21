const articles = [
  {
    id: "1",
    title: "Sample Title 1",
    image: "https://picsum.photos/seed/picsum/200/300",
    content:
      "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse",
    category: "Summercamp",
    highlighted: true
  },
  {
    id: "2",
    title: "Sample Title 2",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "this is the second lot of content",
    category: "COVID-19",
    highlighted: false
  },
  {
    id: "3",
    title: "Sample Title 3",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category: "COVID-19",
    highlighted: true
  },
];

export function getArticlesById(id) {
  return articles.filter((article) => article.id === id);
}

export function getArticles() {
  return articles.filter(a => a);
}

export function getHighlightedArticles() {
  return articles.filter((article) => article.highlighted);
}
