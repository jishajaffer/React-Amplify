const posts = [
  {
    id: "1",
    title: "Sample Title 1",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse"
  },
  {
    id: "2",
    title: "Sample Title 2",
    image: "https://picsum.photos/seed/picsum/200/300",
    content: "AND has amassed a wide variety of client experiences, resulting in lots of good project assets being generated - but not easy to find and browse"
  },
];

export function getPostsById() {
  return posts[0];
}