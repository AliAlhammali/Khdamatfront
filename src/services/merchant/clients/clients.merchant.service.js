import ApiClient from "@/helper/api.helper";

class ClientsMerchant extends ApiClient {
  constructor() {
    super("merchant/clients");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new ClientsMerchant();
