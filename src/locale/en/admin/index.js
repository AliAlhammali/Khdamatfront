import adminAuth from "./auth.json";
import merchant from "./merchant.json";
import sidebar from "./sidebar.json";
import serviceProviders from "./serviceProviders.json";
import categories from "./categories.json";
import services from "./services.json";

export default {
  ...adminAuth,
  ...merchant,
  ...sidebar,
  ...serviceProviders,
  ...categories,
  ...services
};
