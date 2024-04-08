import ApiClient from "@/helper/api.helper";

class UsersMerchant extends ApiClient {
  constructor() {
    super("merchant/merchant-users");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new UsersMerchant();
