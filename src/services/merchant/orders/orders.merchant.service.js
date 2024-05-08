import ApiClient from "@/helper/api.helper";

class OrdersMerchant extends ApiClient {
  constructor() {
    super("merchant/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
  show(id, params) {
    return axios.get(`${this.url}/${id}`, { params });
  }
}

export default new OrdersMerchant();
