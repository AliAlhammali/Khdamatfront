export default {
  routes: [
    {
      path: "/merchants",
      component: () => import("./WrapperMerchants.vue"),
      redirect: { name: "merchants-dashboard" },
      children: [
        {
          path: "dashboard",
          name: "merchants-dashboard",
          component: () => import("./Dashboard/MerchantsDashboard.vue")
        }
      ]
    }
  ]
};
