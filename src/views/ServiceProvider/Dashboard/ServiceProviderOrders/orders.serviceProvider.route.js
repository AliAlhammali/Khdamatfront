export default {
  routes: [
    {
      path: "orders",
      name: "service-provider-orders-dashboard",
      component: () => import("./OrderServiceProviderList.vue"),
      meta: {
        roles: ["admin", "staff"],
      },
    },
    {
      path: "orders/:id",
      name: "service-provider-orders-show",
      component: () => import("./OrderServiceProviderShow.vue"),
      meta: {
        roles: ["admin", "staff"],
      },
    },
  ],
};
