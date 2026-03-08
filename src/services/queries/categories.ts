import { baseAPI } from "..";

export const authenticatedUserAPI = async () =>
  await baseAPI("GET", `/category/list?sort=popular&per_page=5`);
