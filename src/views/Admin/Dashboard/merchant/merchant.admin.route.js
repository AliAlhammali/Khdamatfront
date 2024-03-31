export default {
  routes: [
    {
      path: "merchant",
      name: "admin-merchant-dashboard",
      component: () => import("./MerchantList.vue")
    },
    {
      path: "merchant/create",
      name: "admin-merchant-create",
      component: () => import("./MerchantCreate.vue")
    },
    {
      path: "merchant/:id",
      name: "admin-merchant-show",
      component: () => import("./MerchantShow.vue")
    },
    {
      path: "merchant/:id/edit",
      name: "admin-merchant-edit",
      component: () => import("./MerchantCreate.vue")
    }
  ]
};
