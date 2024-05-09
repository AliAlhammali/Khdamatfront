import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "branches",
      name: "branches-merchant-dashboard",
      component: () => import("./BranchesMerchantList.vue"),
      meta: {
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
    {
      path: "branches/create",
      name: "branches-merchant-create",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
    {
      path: "branches/:id/edit",
      name: "branches-merchant-edit",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
  ],
};
