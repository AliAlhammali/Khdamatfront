import ApiClient from "@/helper/api.helper";

class UsersServiceProvider extends ApiClient {
  constructor() {
    super("service-provider/service-provider-users");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new UsersServiceProvider();
