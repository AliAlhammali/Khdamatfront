export default {
  routes: [
    {
      path: "services-merchant",
      name: "services-merchant-dashboard",
      component: () => import("./ServicesMerchantList.vue")
    }
  ]
};

