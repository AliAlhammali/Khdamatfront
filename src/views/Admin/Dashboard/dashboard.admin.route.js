export default {
  routes: [
    {
      path: "merchant",
      name: "merchant-dashboard",
      component: () => import("./merchant/MerchantAdmin.vue")
    },
    {
      path: "merchant/create",
      name: "merchant-create",
      component: () => import("./merchant/MerchantCreate.vue")
    },
    {
      path: "merchant/:id",
      name: "merchant-show",
      component: () => import("./merchant/MerchantShow.vue")
    },
    {
      path: "merchant/:id/edit",
      name: "merchant-edit",
      component: () => import("./merchant/MerchantEdit.vue")
    }
  ]
};
