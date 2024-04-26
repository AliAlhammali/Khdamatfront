export default {
  routes: [
    {
      path: "users",
      name: "users-merchant-dashboard",
      component: () => import("./UsersMerchantList.vue"),
    },
    {
      path: "users/create",
      name: "users-merchant-create",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: false,
      },
    },
    {
      path: "users/:id/edit",
      name: "users-merchant-edit",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: true,
      },
    },
  ],
};
