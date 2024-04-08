import ApiClient from "@/helper/api.helper";

class CategoriesMerchant extends ApiClient {
  constructor() {
    super("merchant/categories");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new CategoriesMerchant();
