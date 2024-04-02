import ApiClient from "@/helper/api.helper";

class GlobalActions extends ApiClient {
  constructor() {
    super("actions");
  }

  upload_file(file) {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${this.url}/upload`, formData);
  }
}

export default new GlobalActions();
