import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import adminRoute from "@/views/Admin/admin.route";
import merchantsRoute from "@/views/Merchants/merchant.route";
import serviceProviderRoute from "@/views/ServiceProvider/serviceProvider.route";
import landingRoute from "@/views/Landing/landing.route";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...adminRoute.routes,
    ...merchantsRoute.routes,
    ...serviceProviderRoute.routes,
    ...landingRoute.routes,
  ],
});

export default router;
