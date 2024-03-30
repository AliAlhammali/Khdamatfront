export default {
  routes: [
    {
      path: "/service-provider",
      component: () => import("./WrapperServiceProvider.vue"),
      redirect: { name: "service-provider-dashboard" },
      children: [
        {
          path: "dashboard",
          name: "service-provider-dashboard",
          component: () => import("./Dashboard/ServiceProviderDashboard.vue")
        }
      ]
    }
  ]
};
