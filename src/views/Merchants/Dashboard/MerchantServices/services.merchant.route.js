import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "services",
      name: "services-merchant-dashboard",
      component: () => import("./ServicesMerchantList.vue"),
      meta: {
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
  ],
};
