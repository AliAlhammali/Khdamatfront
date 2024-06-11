import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "categories",
      name: "categories-client-dashboard",
      component: () => import("./CategoriesClientList.vue"),
      meta: {
        roles: ["admin"],
      },
      // beforeEnter: merchantRolesGuard,
    },
  ],
};
