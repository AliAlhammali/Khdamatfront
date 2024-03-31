import { createApp } from "vue";

import App from "./App.vue";
import { registerPlugins } from "./plugins";
import axiosClient from "./common/HTTPClient";

const app = createApp(App);

registerPlugins(app);
window.axios = axiosClient;
app.mount("#app");
