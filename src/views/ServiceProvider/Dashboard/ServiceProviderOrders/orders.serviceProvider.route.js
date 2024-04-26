export default {
  routes: [
    {
      path: "orders",
      name: "service-provider-orders-dashboard",
      component: () => import("./OrderServiceProviderList.vue"),
    },
    {
      path: "orders/:id",
      name: "service-provider-orders-show",
      component: () => import("./OrderServiceProviderShow.vue"),
    },
  ],
};
