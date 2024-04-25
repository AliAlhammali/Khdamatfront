import ApiClient from "@/helper/api.helper";

class OrdersAdmin extends ApiClient {
  constructor() {
    super("service-provider/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new OrdersAdmin();
