import ApiClient from "@/helper/api.helper";

class BranchesMerchant extends ApiClient {
  constructor() {
    super("merchant/branches");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new BranchesMerchant();
