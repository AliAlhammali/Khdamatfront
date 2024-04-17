import errors from "./errors.json";
import global from "./global.json";
import admin from "./admin";
import merchant from "./merchant";

export default {
  "$vuetify.open": "English translation for $vuetify.open",
  ...errors,
  ...global,
  ...admin,
  ...merchant
};
