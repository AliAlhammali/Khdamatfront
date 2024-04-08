export default {
  routes: [
    {
      path: "users-merchant",
      name: "users-merchant-dashboard",
      component: () => import("./UsersMerchantList.vue")
    },
    {
      path: "users-merchant/create",
      name: "users-merchant-create",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: false
      }
    },
    {
      path: "users-merchant/:id/edit",
      name: "users-merchant-edit",
      component: () => import("./UsersMerchantCreate.vue"),
      meta: {
        edit: true
      }
    }
  ]
};

