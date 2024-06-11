import ApiClient from "@/helper/api.helper";

class OrdersClient extends ApiClient {
  constructor() {
    super("client/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
  show(id, params) {
    return axios.get(`${this.url}/${id}`, { params });
  }
}

export default new OrdersClient();
