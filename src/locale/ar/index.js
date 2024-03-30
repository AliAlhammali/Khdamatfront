import errors from "./errors.json";
import adminAuth from "./admin/auth.json";
import merchant from "./admin/merchant.json";
import global from "./global.json";

export default {
  "$vuetify.open": "Arabic translation for $vuetify.open",
  ...errors,
  ...global,
  ...adminAuth,
  ...merchant
};
