import { apiUrl } from "../config";
import httpService from "./common/httpService";

export function getCategories() {
  const endpointUrl = apiUrl + "/Categories";
  return httpService.get(endpointUrl);
}