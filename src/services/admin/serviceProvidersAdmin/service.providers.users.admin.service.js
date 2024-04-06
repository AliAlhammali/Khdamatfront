import ApiClient from "@/helper/api.helper";

class MerchantUsersAdmin extends ApiClient {
  constructor() {
    super("admin/service-provider-users");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new MerchantUsersAdmin();
