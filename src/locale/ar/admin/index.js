import adminAuth from "./auth.json";
import merchant from "./merchant.json";
import sidebar from "./sidebar.json";

export default {
  ...adminAuth,
  ...merchant,
  ...sidebar
};
