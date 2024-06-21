import ApiClient from "@/helper/api.helper";

class ServicesClient extends ApiClient {
  constructor() {
    super("client/services");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new ServicesClient();
