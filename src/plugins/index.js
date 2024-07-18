// Plugins
import router from "@/router";
import pinia from "@/stores";
import VueCookies from "vue-cookies";
import { i18n } from "./I18n";
import vuetify from "./vuetify";

import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";

import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import VueSearchSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueSocialSharing from "vue-social-sharing";
import VueApexCharts from "vue3-apexcharts";

import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

import VueGoogleMaps from "vue-google-maps-community-fork";

export function registerPlugins(app) {
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueCookies)
    .use(VueSweetalert2)
    .use(Toast, { position: POSITION.TOP_RIGHT, timeout: 5000 })
    .use(VueSocialSharing)
    .use(VueGoogleMaps, {
      load: {
        key: "AIzaSyALc3U6ZcOdCduy0axfgZQZTL8OugiaOCs",
        libraries: "places",
      },
    });

  app
    .component("VueDatePicker", VueDatePicker)
    .component("DatePicker", DatePicker)
    .component("v-search-select", VueSearchSelect)
    .component("apexchart", VueApexCharts);
}
