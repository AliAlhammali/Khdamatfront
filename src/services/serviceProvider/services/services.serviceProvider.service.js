import ApiClient from "@/helper/api.helper";

class ServicesServiceProvider extends ApiClient {
  constructor() {
    super("service-provider/services");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new ServicesServiceProvider();
