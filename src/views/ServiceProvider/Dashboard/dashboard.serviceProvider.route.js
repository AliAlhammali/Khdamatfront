export default {
  routes: [
    {
      path: "dashboard",
      name: "service-provider-dashboard",
      component: () => import("./home/ServiceProviderHome.vue")
    }
  ]
};
