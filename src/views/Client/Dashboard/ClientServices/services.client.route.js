import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "services",
      name: "services-client-dashboard",
      component: () => import("./ServicesClientList.vue"),
      meta: {
        roles: ["admin"],
      },
      // beforeEnter: merchantRolesGuard,
    },
  ],
};
