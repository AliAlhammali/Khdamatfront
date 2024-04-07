export default {
  routes: [
    {
      path: "dashboard",
      name: "merchant-dashboard",
      component: () => import("./home/MerchantHome.vue")
    }
  ]
};
