export default {
  routes: [
    {
      path: "orders",
      name: "orders-merchant-dashboard",
      component: () => import("./OrdersMerchantList.vue"),
    },
    {
      path: "orders/create",
      name: "orders-merchant-create",
      component: () => import("./OrdersMerchantCreate.vue"),
      meta: {
        edit: false,
      },
    },
    {
      path: "orders/:id",
      name: "orders-merchant-show",
      component: () => import("./OrdersMerchantShow.vue"),
      meta: {
        edit: true,
      },
    },
  ],
};
