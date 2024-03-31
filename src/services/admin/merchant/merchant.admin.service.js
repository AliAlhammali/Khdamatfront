import ApiClient from "@/helper/api.helper";

class MerchantAdmin extends ApiClient {
  constructor() {
    super("admin/merchants");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new MerchantAdmin();
