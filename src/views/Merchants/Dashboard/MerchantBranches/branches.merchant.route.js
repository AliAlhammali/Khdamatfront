export default {
  routes: [
    {
      path: "branches-merchant",
      name: "branches-merchant-dashboard",
      component: () => import("./BranchesMerchantList.vue")
    },
    {
      path: "branches-merchant/create",
      name: "branches-merchant-create",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: false
      }
    },
    {
      path: "branches-merchant/:id/edit",
      name: "branches-merchant-edit",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: true
      }
    }
  ]
};

