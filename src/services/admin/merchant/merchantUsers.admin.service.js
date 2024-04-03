import ApiClient from "@/helper/api.helper";

class MerchantUsersAdmin extends ApiClient {
  constructor() {
    super("admin/merchant-users");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new MerchantUsersAdmin();
