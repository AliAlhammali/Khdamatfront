export default {
  routes: [
    {
      path: "services-service-provider",
      name: "services-service-provider-dashboard",
      component: () => import("./ServicesServiceProviderList.vue")
    }
  ]
};

