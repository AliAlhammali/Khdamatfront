export default {
  routes: [
    {
      path: "clients-merchant",
      name: "clients-merchant-dashboard",
      component: () => import("./ClientsMerchantList.vue")
    },
    {
      path: "clients-merchant/create",
      name: "clients-merchant-create",
      component: () => import("./ClientsMerchantCreate.vue"),
      meta: {
        edit: false
      }
    },
    {
      path: "clients-merchant/:id/edit",
      name: "clients-merchant-edit",
      component: () => import("./ClientsMerchantCreate.vue"),
      meta: {
        edit: true
      }
    }
  ]
};

