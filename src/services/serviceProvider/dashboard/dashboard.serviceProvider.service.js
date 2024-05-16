import ApiClient from "@/helper/api.helper";

class ClientsMerchant extends ApiClient {
  constructor() {
    super("service-provider/dashboard");
  }

  get_figures(params) {
    return axios.get(`${this.url}/figures`, { params });
  }

  get_top_staff_by_orders(params) {
    return axios.get(`${this.url}/top_staff_by_orders`, { params });
  }
  get_top_staff_completed_orders(params) {
    return axios.get(`${this.url}/top_staff_completed_orders`, { params });
  }

  get_calender_orders(params) {
    return axios.get(`${this.url}/calender_orders`, { params });
  }
}

export default new ClientsMerchant();
