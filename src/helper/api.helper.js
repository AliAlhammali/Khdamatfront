/* global axios */
class ApiClient {
  constructor(resource, options = {}, v = "v1") {
    this.options = options;
    this.resource = resource;
    this.version = v;
  }

  get url() {
    return `${import.meta.env.VITE_BASE_API_URL}/${this.version}/${
      this.resource
    }`;
  }

  get() {
    return axios.get(this.url);
  }

  show(id) {
    return axios.get(`${this.url}/${id}`);
  }

  create(data) {
    return axios.post(`${this.url}/create`, data);
  }

  update(id, data) {
    return axios.put(`${this.url}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${this.url}/${id}`);
  }
}

export default ApiClient;
