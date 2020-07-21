const posts = [
  {
    id: "1",
    title: "Sample Title 1",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse",
    category: "Summercamp"
  },
  {
    id: "2",
    title: "Sample Title 2",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "this is the second lot of content",
    category: "Covid19"
  },
];

export function getPostsById(id) {
  const post = posts.filter(post => parseInt(post.id) === id);
  return post[0];
}