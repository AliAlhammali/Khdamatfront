// Plugins
import vuetify from "./vuetify";
import { i18n } from "./I18n";
import pinia from "@/stores";
import router from "@/router";
import VueCookies from "vue-cookies";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import VueSearchSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueSocialSharing from "vue-social-sharing";

export function registerPlugins(app) {
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueCookies)
    .use(VueSweetalert2)
    .use(Toast, { position: POSITION.TOP_RIGHT, timeout: 5000 })
    .use(VueSocialSharing);

  app
    .component("VueDatePicker", VueDatePicker)
    .component("v-search-select", VueSearchSelect);
}
