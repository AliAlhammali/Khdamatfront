import ApiClient from "@/helper/api.helper";

class SettingsAdmin extends ApiClient {
  constructor() {
    super("admin/settings");
  }

  get(type, params) {
    return axios.get(`${this.url}/${type}`, { params });
  }

  update(type, data) {
    return axios.patch(`${this.url}/update/${type}`, {
      settings: {
        ...data,
      },
    });
  }
}

export default new SettingsAdmin();
