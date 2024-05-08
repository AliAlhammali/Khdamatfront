import ApiClient from "@/helper/api.helper";

class OrdersAdmin extends ApiClient {
  constructor() {
    super("service-provider/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
  show(id, params) {
    return axios.get(`${this.url}/${id}`, { params });
  }
}

export default new OrdersAdmin();
