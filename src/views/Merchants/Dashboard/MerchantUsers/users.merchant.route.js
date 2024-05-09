import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "users",
      name: "users-merchant-dashboard",
      component: () => import("./UsersMerchantList.vue"),
      beforeEnter: merchantRolesGuard,
      meta: {
        roles: ["admin"],
      },
    },
    {
      path: "users/create",
      name: "users-merchant-create",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
    {
      path: "users/:id/edit",
      name: "users-merchant-edit",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin"],
      },
      beforeEnter: merchantRolesGuard,
    },
  ],
};
