import { createRouter, createWebHashHistory } from "vue-router";
import adminRoute from "@/views/Admin/admin.route";
import merchantsRoute from "@/views/Merchants/merchants.route";
import serviceProviderRoute from "@/views/ServiceProvider/serviceProvider.route";
import landingRoute from "@/views/Landing/landing.route";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...adminRoute.routes,
    ...merchantsRoute.routes,
    ...serviceProviderRoute.routes,
    ...landingRoute.routes
  ]
});

export default router;