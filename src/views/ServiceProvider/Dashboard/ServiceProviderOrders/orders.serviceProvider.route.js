export default {
  routes: [
    {
      path: "orders-service-provider",
      name: "service-provider-orders-dashboard",
      component: () => import("./OrderServiceProviderList.vue"),
    },
    {
      path: "orders-service-provider/:id",
      name: "service-provider-orders-show",
      component: () => import("./OrderServiceProviderShow.vue"),
    },
  ],
};
