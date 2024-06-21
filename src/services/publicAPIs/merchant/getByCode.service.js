import ApiClient from "@/helper/api.helper";

class GetMerchantByCode extends ApiClient {
  constructor() {
    super("public/merchants");
  }

  get(code) {
    return axios.get(`${this.url}/${code}`);
  }
}

export default new GetMerchantByCode();
