import adminAuth from "./auth.json";
import merchant from "./merchant.json";
import sidebar from "./sidebar.json";
import serviceProviders from "./serviceProviders.json";

export default {
  ...adminAuth,
  ...merchant,
  ...sidebar,
  ...serviceProviders
};
