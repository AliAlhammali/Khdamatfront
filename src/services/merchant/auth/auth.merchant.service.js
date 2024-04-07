import ApiClient from "@/helper/api.helper";

class AuthAdmin extends ApiClient {
  constructor() {
    super("merchant-auth");
  }

  login(data) {
    return axios.post(`${this.url}/login`, data);
  }

  logout() {
    return axios.post(`${this.url}/logout`);
  }
}

export default new AuthAdmin();
