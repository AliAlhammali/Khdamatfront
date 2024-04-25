import ApiClient from "@/helper/api.helper";

class OrdersAdmin extends ApiClient {
  constructor() {
    super("admin/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new OrdersAdmin();
