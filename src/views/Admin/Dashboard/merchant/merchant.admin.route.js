export default {
  routes: [
    {
      path: "merchant",
      name: "merchant-dashboard",
      component: () => import("./MerchantList.vue")
    },
    {
      path: "merchant/create",
      name: "merchant-create",
      component: () => import("./MerchantCreate.vue")
    },
    {
      path: "merchant/:id",
      name: "merchant-show",
      component: () => import("./MerchantShow.vue")
    },
    {
      path: "merchant/:id/edit",
      name: "merchant-edit",
      component: () => import("./MerchantEdit.vue")
    }
  ]
};
