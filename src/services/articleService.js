import { apiUrl } from "../config";
import httpService from "./common/httpService";

export function getArticles() {
  const endpointUrl = apiUrl + "/Articles";
  return httpService.get(endpointUrl);
}

export function getArticlesByCategory(category) {
  const endpointUrl = apiUrl + `/Articles/${category}`;
  return httpService.get(endpointUrl);
}

export function getArticleById(id) {
  const endpointUrl = apiUrl + `/Articles/${id}`;
  return httpService.get(endpointUrl);
}

export function postNewArticle(article) {
  const endpointUrl = apiUrl + "/Articles";
  return httpService.post(endpointUrl, article);
}

// essentially duplicate code
export function updateArticle(article) {
  const endpointUrl = apiUrl + `/Articles/${article.articleID}`;
  return httpService.put(endpointUrl, article);
}

export function deleteArticle(article) {
  const endpointUrl = apiUrl + `/Articles/${article.articleID}`;
  return httpService.delete(endpointUrl);
}