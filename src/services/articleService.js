import { apiUrl } from "../config";
import httpService from "./common/httpService";

export function getArticles() {
  const endpointUrl = apiUrl + "/Articles";
  return httpService.get(endpointUrl);
}

export function getArticlesByCategory() {
  const endpointUrl = apiUrl + "/Articles";
  return httpService.get(endpointUrl);
}

export function getArticleById(id) {
  const endpointUrl = apiUrl + `/Articles/${id}`;
  return httpService.get(endpointUrl);
}

export function postNewArticle(article) {
  const endpointUrl = apiUrl + "/Articles";
  const currentTime = new Date().toISOString();
  let articleToPost = {
    articleID: 0,
    title: article.title,
    content: article.content,
    dateCreated: currentTime,
    dateLastUpdated: currentTime,
    user: {
      userID: "555b4ad2-f15e-4687-a434-308841978474",
      firstName: "atmHardCode",
      lastName: "atmHardCode",
      picture: "atmHardCode",
      emailAddress: "atmHardCode",
      permissionLevel: "admin"
    },
    highlighted: article.highlighted,
    picture: article.imageUrl,
    articleCategories: [
      {
        category: {
          categoryID: 1,
          categoryName: "books"
        }
      }
    ]
  };
  return httpService.post(endpointUrl, articleToPost);
}

// essentially duplicate code
export function updateArticle(article) {
  const endpointUrl = apiUrl + `/Articles/${article.id}`;
  console.log(endpointUrl);
  const currentTime = new Date().toISOString();
  let articleToUpdate = {
    articleID: 0,
    title: article.title,
    content: article.content,
    dateCreated: currentTime,
    dateLastUpdated: currentTime,
    user: {
      userID: "555b4ad2-f15e-4687-a434-308841978474",
      firstName: "atmHardCode",
      lastName: "atmHardCode",
      picture: "atmHardCode",
      emailAddress: "atmHardCode",
      permissionLevel: "admin"
    },
    highlighted: article.highlighted,
    picture: article.imageUrl,
    articleCategories: [
      {
        category: {
          categoryID: 1,
          categoryName: "books"
        }
      }
    ]
  };
  return httpService.put(endpointUrl, articleToUpdate);
}