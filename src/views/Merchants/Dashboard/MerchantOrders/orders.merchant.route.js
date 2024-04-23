export default {
  routes: [
    {
      path: "orders-merchant",
      name: "orders-merchant-dashboard",
      component: () => import("./OrdersMerchantList.vue"),
    },
    {
      path: "orders-merchant/create",
      name: "orders-merchant-create",
      component: () => import("./OrdersMerchantCreate.vue"),
      meta: {
        edit: false,
      },
    },
    {
      path: "orders-merchant/:id",
      name: "orders-merchant-show",
      component: () => import("./OrdersMerchantShow.vue"),
      meta: {
        edit: true,
      },
    },
  ],
};
