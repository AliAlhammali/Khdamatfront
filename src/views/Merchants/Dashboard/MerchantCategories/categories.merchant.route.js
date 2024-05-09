import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "categories",
      name: "categories-merchant-dashboard",
      component: () => import("./CategoriesMerchantList.vue"),
      meta: {
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
  ],
};
