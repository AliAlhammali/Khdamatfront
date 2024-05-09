export default {
  routes: [
    {
      path: "orders",
      name: "orders-merchant-dashboard",
      component: () => import("./OrdersMerchantList.vue"),
      meta: {
        roles: ["admin", "staff"],
      },
    },
    {
      path: "orders/create",
      name: "orders-merchant-create",
      component: () => import("./OrdersMerchantCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin", "staff"],
      },
    },
    {
      path: "orders/:id",
      name: "orders-merchant-show",
      component: () => import("./OrdersMerchantShow.vue"),
      meta: {
        edit: true,
        roles: ["admin", "staff"],
      },
    },
  ],
};
