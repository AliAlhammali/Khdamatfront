export default {
  routes: [
    {
      path: "/merchant",
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
