import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "orders",
      name: "orders-client",
      component: () => import("./OrdersClientList.vue"),
      meta: {
        roles: ["admin", "staff"],
      },
      beforeEnter: merchantRolesGuard,
    },
    {
      path: "orders/create",
      name: "orders-merchant-create",
      component: () => import("./OrdersClientCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin", "staff"],
      },
      beforeEnter: merchantRolesGuard,
    },
    {
      path: "orders/:id",
      name: "orders-merchant-show",
      component: () => import("./OrdersClientShow.vue"),
      meta: {
        edit: true,
        roles: ["admin", "staff"],
      },
      beforeEnter: merchantRolesGuard,
    },
  ],
};
