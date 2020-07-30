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