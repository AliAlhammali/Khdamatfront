import ApiClient from "@/helper/api.helper";

class MerchantAdmin extends ApiClient {
  constructor() {
    super("admin/services");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new MerchantAdmin();
