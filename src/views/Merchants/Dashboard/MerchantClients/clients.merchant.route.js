export default {
  routes: [
    {
      path: "clients",
      name: "clients-merchant-dashboard",
      component: () => import("./ClientsMerchantList.vue"),
    },
    {
      path: "clients/create",
      name: "clients-merchant-create",
      component: () => import("./ClientsMerchantCreate.vue"),
      meta: {
        edit: false,
      },
    },
    {
      path: "clients/:id/edit",
      name: "clients-merchant-edit",
      component: () => import("./ClientsMerchantCreate.vue"),
      meta: {
        edit: true,
      },
    },
  ],
};
