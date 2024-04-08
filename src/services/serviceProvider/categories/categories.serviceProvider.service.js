import ApiClient from "@/helper/api.helper";

class CategoriesServiceProvider extends ApiClient {
  constructor() {
    super("service-provider/categories");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new CategoriesServiceProvider();
