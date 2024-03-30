// Plugins
import vuetify from "./vuetify";
import { i18n } from "./I18n";
import pinia from "@/stores";
import router from "@/router";
import VueCookies from "vue-cookies";

export function registerPlugins(app) {
  app.use(i18n).use(vuetify).use(router).use(pinia).use(VueCookies);
}
