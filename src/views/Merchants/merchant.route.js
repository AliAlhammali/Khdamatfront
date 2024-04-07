import {
  merchantGuestGuard,
  merchantAuthGuard
} from "@/helper/merchant.router.helper";

import dashboardMerchantRoute from "./Dashboard/dashboard.merchant.route";

export default {
  routes: [
    {
      path: "/merchant",
      component: () => import("./WrapperMerchants.vue"),
      redirect: { name: "merchant-login" },
      children: [
        {
          path: "login",
          name: "merchant-login",
          component: () => import("./Auth/MerchantsLogin.vue"),
          beforeEnter: merchantAuthGuard
        },
        {
          path: "",
          component: () => import("./Dashboard/MerchantsDashboard.vue"),
          redirect: { name: "merchant-dashboard" },
          beforeEnter: merchantGuestGuard,
          children: [...dashboardMerchantRoute.routes]
        }
      ]
    }
  ]
};
