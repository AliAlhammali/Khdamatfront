import ApiClient from "@/helper/api.helper";

class CategoriesClient extends ApiClient {
  constructor() {
    super("client/categories");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new CategoriesClient();
