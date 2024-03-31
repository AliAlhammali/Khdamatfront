import ApiClient from "@/helper/api.helper";

class AuthAdmin extends ApiClient {
  constructor() {
    super("admin-auth");
  }

  login(data) {
    return axios.post(`${this.url}/login`, data);
  }
}

export default new AuthAdmin();
