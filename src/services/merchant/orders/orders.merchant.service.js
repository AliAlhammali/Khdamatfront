import ApiClient from "@/helper/api.helper";

class OrdersMerchant extends ApiClient {
  constructor() {
    super("merchant/orders");
  }

  get(params) {
    return axios.get(this.url, { params });
  }
}

export default new OrdersMerchant();
