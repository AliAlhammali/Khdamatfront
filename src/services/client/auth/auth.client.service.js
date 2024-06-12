import ApiClient from "@/helper/api.helper";

class AuthClient extends ApiClient {
  constructor() {
    super("client-auth");
  }

  login(data) {
    return axios.post(`${this.url}/login`, data);
  }

  register(data) {
    return axios.post(`${this.url}/register`, data);
  }

  logout() {
    return axios.post(`${this.url}/logout`);
  }
}

export default new AuthClient();
