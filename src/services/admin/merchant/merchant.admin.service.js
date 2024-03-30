import ApiClient from "@/helper/api.helper";

class MerchantAdmin extends ApiClient {
  constructor() {
    super("admin/merchants");
  }
}

export default new MerchantAdmin();
