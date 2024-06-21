import ApiClient from "@/helper/api.helper";

class PublicSettings extends ApiClient {
  constructor() {
    super("public/settings");
  }

  get(type, params) {
    return axios.get(`${this.url}/${type}`, { params });
  }
}

export default new PublicSettings();
