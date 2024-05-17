import ApiClient from "@/helper/api.helper";

class DashboardMerchant extends ApiClient {
  constructor() {
    super("admin/dashboard");
  }

  get_figures(params) {
    return axios.get(`${this.url}/figures`, { params });
  }

  get_top_merchants_by_orders(params) {
    return axios.get(`${this.url}/top_merchants_by_orders`, { params });
  }
  get_top_sp_completed_by_orders(params) {
    return axios.get(`${this.url}/top_sp_completed_by_orders`, { params });
  }

  get_top_services(params) {
    return axios.get(`${this.url}/top_services`, { params });
  }

  get_top_categories(params) {
    return axios.get(`${this.url}/top_categories`, { params });
  }
}

export default new DashboardMerchant();
