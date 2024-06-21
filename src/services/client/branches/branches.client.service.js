import ApiClient from "@/helper/api.helper";

class BranchesClient extends ApiClient {
  constructor() {
    super("client/branches");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new BranchesClient();
