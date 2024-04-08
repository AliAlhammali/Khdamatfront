import ApiClient from "@/helper/api.helper";

class ServicesMerchant extends ApiClient {
  constructor() {
    super("merchant/services");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new ServicesMerchant();
